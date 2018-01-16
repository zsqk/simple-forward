import * as Koa from 'koa';
import * as request from 'supertest';
import app from '../src/app';
import { hi } from '../src/app';

test('hi middleware', async () => {
  const ctx: Koa.Context = {};
  await hi(ctx);
  expect(ctx.body).toBe('Hello World');
});

test('server works', async () => {
  const response = await request(app.callback()).get('/');
  expect(response).toBeDefined();
});
