import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import proxy from './includes/proxy';

const app = new Koa();

export const hi = async (ctx: Koa.Context) => {
  if (!ctx.body) {
    ctx.body = 'Hello World';
  }
};

app.use(bodyParser());
app.use(proxy);
app.use(hi);

app.listen(process.env.PORT || 3000);

console.log('系统开始运行', new Date());

export default app;
