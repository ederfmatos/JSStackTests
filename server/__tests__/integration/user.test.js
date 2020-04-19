import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';
import truncate from '../util/truncate';
import User from '../../src/app/models/User';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Eder Matos',
        email: 'ederfmatos@gmail.com',
        password: '12345678',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to register with duplicated email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Eder Matos',
        email: 'ederfmatos@gmail.com',
        password: '12345678',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Eder Matos',
        email: 'ederfmatos@gmail.com',
        password: '12345678',
      });

    expect(response.status).toBe(400);
  });

  it('should encrypt user password when new user created', async () => {
    const user = await User.create({
      name: 'Eder Matos',
      email: 'ederfmatos@gmail.com',
      password: '12345678',
    });

    const compareHash = await bcrypt.compare('12345678', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
