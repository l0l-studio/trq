import { Context, Router } from 'oak';
import { db } from '$lib/db/db.ts';
import { users } from '$lib/drizzle/schema.ts';

export const usersRouter = new Router();

usersRouter
    .get('/', async (ctx: Context) => {
        ctx.response.body = 'todo implements users route';
        const result = await db.select().from(users).all();

        ctx.response.type = 'application/json';
        ctx.response.body = result;
    });
