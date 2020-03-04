import request from 'supertest';

import app from '../src/app';
import { connect, disconnect } from '../scripts/mongo-setup';

beforeAll(connect);
afterAll(disconnect);

const data = {
  firstName: 'Tolu',
  lastName: 'Ayodele',
  phone: '08029003784',
  bvn: '2219908764',
  email: 'tayodele@yahoo.com',
  password: '123abc',
  pin: '1234',
};

describe('Server', () => {
  test('Has a /api endpoint', async () => {
    return await request(app)
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, { message: 'Hello World' });
  });
});
describe('CREATE a user account', () => {
  test('Should create a user account', async () => {
    return await request(app)
      .post('/api/v1/users')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    // .expect(res => {
    //   const resValues = Object.values(res.body);
    //   const resKeys = Object.keys(res.body);
    //   expect(res.status).toBe(201);
    //   // expect(resValues).toContain('Stack successfully created');
    //   // expect(resKeys).toContain('payload');
    // });
  });
});

// describe('Server', () => {
//   test('Has a /api/v1/transactions endpoint', async () => {
//     return await request(app)
//       .get('/api/v1/transactions')
//       .expect('Content-Type', /json/)
//       .expect(200, { doc: [] });
//   });
// });

// describe('Add users', () => {
//   let data = {
//     firstName: 'Jones',
//     lastName: 'Ogolo',
//     phone: '08044556678',
//     bvn: '1234567893',
//     email: 'jones@aol.com',
//     password: '123abc',
//     pin: '1234',
//   };
//   it('Should create a new user', async done => {
//     const res = await request(app)
//       .post('/api/v1/users')
//       .send(data);

//     expect(res.status).toBe(201);
//     // expect(res.body).toHaveProperty('doc');
//     done();
//   });
// });

// it('Results in an error when querying a non-existent user', async () => {
//   const response = await request(app).get(
//     '/api/v1/users/5e327126aee23c37c4d28eb1',
//   );

//   expect(response.status).toBe(404);
//   expect(response.body).toEqual({ message: 'User not found' });
// });

// it('returns an array when qweryng for transactions', async () => {
//   const response = await request(app).get('/api/v1/transactions');

//   expect(response.status).toBe(200);
//   expect(response.body).toBeInstanceOf(Object);
// });

// it('returns an array when qweryng for users', async () => {
//   const response = await request(app).get('/api/v1/users');

//   expect(response.status).toBe(200);
//   expect(Array.isArray(response.body.data)).toBe(true);
// });

// it('returns an array when qweryng for transactions', async () => {
//   const response = await request(app).get('/api/v1/transactions');

//   expect(response.status).toBe(200);
//   expect(Array.isArray(response.body.doc)).toBe(true);
// });
