import * as Koa from 'koa';
import fetch from 'node-fetch';

const proxy = async (ctx: Koa.Context) => {
  try {
    const url = `https://${ctx.header.host + ctx.path}?${ctx.querystring}`;
    const body = await fetch(url, {
      body: ctx.request.rawBody,
      headers: {
        'Content-Type': ctx.header['content-type'],
        'User-Agent': 'zsqk-node',
      },
      method: ctx.method,
    }).then(res => res.text());
    ctx.body = body;
  } catch (err) {
    console.error(err);
    ctx.body = '"出错了"';
  } finally {
    console.log('请求执行完毕');
  }
};

export default proxy;
