import * as Koa from 'koa';
const app = new Koa();

export const hi = async (ctx: Koa.Context) => {
  ctx.body = 'Hello World';
};

app.use(hi);

app.listen(3000);

export default app;
