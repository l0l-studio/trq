import { Context, Router } from 'oak';

export const pagesRouter = new Router();

pagesRouter
    .get('/', (ctx: Context) => {
        ctx.response.body = 'implement pages routes';
    });
