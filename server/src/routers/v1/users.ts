import { Context, Router } from 'oak';

export const usersRouter = new Router();

usersRouter
    .get('/', (ctx: Context) => {
        ctx.response.body = 'todo implements users route';
    });
