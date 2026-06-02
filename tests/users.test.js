const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/models/User', () => {
  const mock = function (data) { this.save = jest.fn().mockResolvedValue(Object.assign({ _id: '1' }, data)); };
  mock.find = jest.fn().mockResolvedValue([]);
  return mock;
});

describe('Users API', () => {
  test('GET /api/users returns 200 and array', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/users validation fails without email', async () => {
    const res = await request(app).post('/api/users').send({ name: 'NoEmail' });
    expect(res.statusCode).toBe(400);
    expect(res.body.errors).toBeDefined();
  });

  test('POST /api/users creates user with valid data', async () => {
    const res = await request(app).post('/api/users').send({ name: 'Alice', email: 'alice@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.email).toBe('alice@example.com');
  });
});
