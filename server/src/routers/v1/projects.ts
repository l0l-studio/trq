import { Context, Router } from 'oak';

export const projectsRouter = new Router();

projectsRouter
    .get('/', (ctx: Context) => {
        ctx.response.body = 'implement pages routes';
    });
