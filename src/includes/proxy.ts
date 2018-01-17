import * as Koa from 'koa';
import fetch from 'node-fetch';

const proxy = async (ctx: Koa.Context) => {
  const time = Date.now();
  try {
    const url = `https://${ctx.header.host + ctx.path}?${ctx.querystring}`;
    console.log(time, '请求 url', url);
    console.log(time, '请求 body', ctx.request.rawBody);
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
    console.error(time, err);
    ctx.body = '"出错了"';
  } finally {
    console.log(time, '请求执行完毕');
  }
};

export default proxy;
