import * as Koa from 'koa';
import fetch from 'node-fetch';

const proxy = async (ctx: Koa.Context) => {
  const time = Date.now();
  try {
    const {
      host,
      thehost,
      ...rest,
    } = ctx.header;
    if (!thehost) {
      ctx.body = '"some"';
      return;
    }
    let url = `https://${thehost + ctx.path}`;
    if (ctx.querystring) {
      url += `?${ctx.querystring}`;
    }
    console.log(time, '请求', url, ctx.request.rawBody);
    const body = await fetch(url, {
      body: ctx.request.rawBody,
      headers: Object.assign({
        'access-control-allow-origin': '*',
      }, rest, {
        'user-agent': 'zsqk-node',
      }),
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
