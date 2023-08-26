import { Application, Router } from 'oak';
import { v1 } from './routers/v1/route.ts';
import cors from '$lib/cors.ts';

const router = new Router();

router.get('/', (ctx) => {
    ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>trq api</title><head>
      <body>
        <h1>trq api</h1>
        <a href="https://github.com/thelostcreatives/trq">github</a>
      </body>
    </html>
  `;
});

router.use('/api/v1', v1.routes());

const app = new Application();

app.use(cors);
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
