import type { Page } from '$lib/drizzle/types.ts';

import { Context, Router } from 'oak';
import { Status } from 'http_status';
import { eq } from 'drizzle-orm';

import { pages } from '$lib/drizzle/schema.ts';
import { respondWithData, respondWithError } from '$lib/utils.ts';
import { db } from '$lib/db/db.ts';

export const pagesRouter = new Router();

pagesRouter
    .get('/', async (ctx: Context) => {
        const authorId = ctx.request.url.searchParams.get('authorId');

        if (!authorId) {
            //TODO: implement offset (pagination)
            const pageList = await db.select().from(pages).limit(20).all();

            respondWithData<Page[]>(ctx, Status.OK, { data: pageList });
            return;
        }

        const pageList = await db.select().from(pages).where(
            eq(pages.authorId, authorId),
        ).limit(20).all();

        respondWithData<Page>(ctx, Status.OK, { data: pageList });
        return;
    })
    .get('/:id', async (ctx: Context) => {
        try {
            const page = await db.select().from(pages).where(
                eq(pages.id, ctx.params.id),
            ).get();

            if (!page) {
                respondWithError(ctx, Status.NotFound, { error: 'not found' });
                return;
            }

            respondWithData<Page>(ctx, Status.OK, { data: page });
            console.log(page);
        } catch (err) {
            console.log(err);
        }
    })
    .post('/', async (ctx: Context) => {
        const data = await ctx.request.body().value;

        //TODO(@xanderjakeq): validate with zod instead?? maybe if it gets too
        //big
        //
        if (!data.id || !data.authorId) {
            respondWithError(ctx, Status.BadRequest, {
                error: 'missing value(s)',
            });
            return;
        }

        //TODO: make sure current user (in jwt) have the id from data
        //if (jwt.user.id === id)

        data.createdAt = Date.now();
        const page = await db.insert(pages).values(data).returning().get();

        respondWithData<Page>(ctx, Status.Created, { data: page });
    });
