import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import proxy from './includes/proxy';

const app = new Koa();

export const hi = async (ctx: Koa.Context) => {
  if (!ctx.body) {
    ctx.body = 'Hello World';
  }
};

app.use(async (ctx: Koa.Context, next: any) => {
  await next();
  ctx.set('Access-Control-Allow-Origin', '*');
});

app.use(bodyParser());
app.use(proxy);
app.use(hi);

const port = process.env.PORT || 80;
app.listen(port);

console.log(`系统开始运行在: ${port}`, new Date());

export default app;
