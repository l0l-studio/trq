import { Context, Router } from 'oak';
import { usersRouter } from './users.ts';
import { projectsRouter } from './projects.ts';
import { pagesRouter } from './pages.ts';

export const v1 = new Router();

v1.get('/', (ctx: Context) => {
    ctx.response.body = 'v1 api';
})
    .use('/users', usersRouter.routes())
    .use('/projects', projectsRouter.routes())
    .use('/pages', pagesRouter.routes());
