const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/models/User', () => {
  const users = [];

  const buildQuery = (result) => ({
    select: jest.fn(() => Promise.resolve(result)),
    then: (resolve, reject) => Promise.resolve(result).then(resolve, reject),
    catch: (fn) => Promise.resolve(result).catch(fn)
  });

  const mockUser = function (data) {
    Object.assign(this, data);
    this.save = jest.fn().mockImplementation(async () => {
      const created = { _id: `${users.length + 1}`, ...data };
      users.push(created);
      return created;
    });
  };

  mockUser.find = jest.fn(() => buildQuery(users.map(({ password, ...rest }) => rest)));
  mockUser.findOne = jest.fn(({ email }) => {
    const found = users.find((u) => u.email === email) || null;
    return buildQuery(found);
  });
  mockUser.create = jest.fn(async (data) => {
    const created = { _id: `${users.length + 1}`, ...data };
    users.push(created);
    return created;
  });
  mockUser.findById = jest.fn((id) => {
    const found = users.find((u) => u._id === id) || null;
    return buildQuery(found);
  });
  mockUser.findByIdAndUpdate = jest.fn(async (id, updates) => {
    const index = users.findIndex((u) => u._id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates };
    const { password, ...rest } = users[index];
    return rest;
  });
  mockUser.findByIdAndDelete = jest.fn(async (id) => {
    const index = users.findIndex((u) => u._id === id);
    if (index === -1) return null;
    const [deleted] = users.splice(index, 1);
    const { password, ...rest } = deleted;
    return rest;
  });

  return mockUser;
});

describe('Auth and Users API', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'testsecret';
  });

  test('POST /api/auth/register returns token and user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ name: 'Alice', email: 'alice@example.com', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('alice@example.com');
    expect(res.body.user.password).toBeUndefined();
  });

  test('POST /api/auth/login returns token for valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'alice@example.com', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('alice@example.com');
  });
});
