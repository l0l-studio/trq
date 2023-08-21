import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { v1 } from './routers/v1/route.ts';

const router = new Router();

//router.use
router.get('/', (ctx) => {
    ctx.response.body = `<!DOCTYPE html>
    <html>
      <head><title>Hello oak!</title><head>
      <body>
        <h1>Hello oak!</h1>
      </body>
    </html>
  `;
});

router.use('/api/v1', v1.routes());

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });
