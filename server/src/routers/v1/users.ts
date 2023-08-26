import { type Context, Router } from 'oak';
import type { User } from '$lib/drizzle/types.ts';

import { Status } from 'http_status';
import { eq, sql } from 'drizzle-orm';

import { db } from '$lib/db/db.ts';
import { users } from '$lib/drizzle/schema.ts';
import { respondWithData, respondWithError } from '$lib/utils.ts';
import env from '$lib/env.ts';

export const usersRouter = new Router();

usersRouter
    .get('/', async (ctx: Context) => {
        const accessToken = ctx.request.headers.get('Authorization')?.split(
            ' ',
        )[1];

        //TODO(@xanderjakeq): create a middleware to validate accessToken
        const res = await fetch('https://id.twitch.tv/oauth2/validate', {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        });

        const data = await res.json();

        if (!accessToken || !res.ok) {
            respondWithError(ctx, Status.Unauthorized, {
                error: 'unauthorized',
            });
            return;
        }

        let user: User;
        try {
            const existingUser = await db.select().from(users).where(
                eq(users.username, data.login),
            ).get();

            if (!existingUser) {
                throw new Error('user not found');
            }

            user = existingUser;
        } catch (err) {
            const res = await fetch(
                'https://api.twitch.tv/helix/users',
                {
                    headers: {
                        Authorization: 'Bearer ' + accessToken,
                        'Client-Id': env.TWITCH_CLIENT_ID,
                    },
                },
            );

            const { data: twitchData } = await res.json();

            user = await db.insert(users).values({
                username: data.login,
                email: twitchData[0].email,
            }).returning().get();
        }

        respondWithData<User>(
            ctx,
            Status.OK,
            {
                data: user,
            },
        );
    })
    .get('/:id', async (ctx: Context) => {
        const user: User = await db.select().from(users).where(
            eq(users.id, ctx.params.id),
        ).get();

        if (!user) {
            respondWithError(ctx, Status.NotFound, { error: 'not found' });
            return;
        }

        respondWithData<User>(
            ctx,
            Status.OK,
            {
                data: user,
            },
        );
    });
