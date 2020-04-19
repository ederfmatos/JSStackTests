import request from 'supertest';

import app from '../../src/app';

describe('User', () => {
  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Eder Matos',
        email: 'ederfmatos@gmail.com',
        password_hash: '12345678',
      });

    expect(response.body).toHaveProperty('id');
  });
});
