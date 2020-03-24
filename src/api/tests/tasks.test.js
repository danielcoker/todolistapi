import app from '../../config/app';
import supertest from 'supertest';
import dbHandler from './helpers/dbHandler';
import User from '../models/User';
import Task from '../models/Task';

const request = supertest(app);

describe('Tasks Test', () => {
  beforeAll(async () => await dbHandler.connect());

  afterAll(async () => await dbHandler.close());

  it('gets all tasks from database', async done => {
    const response = await request.get('/api/v1/tasks');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    done();
  });

  it('logged in user can create a new task', async done => {
    const newUser = await request.post('/api/v1/auth/register').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: 'Password321',
      confirmPassword: 'Password321'
    });

    const loggedInUser = await request.post('/api/v1/auth/login').send({
      email: 'john@gmail.com',
      password: 'Password321'
    });

    const response = await request
      .post('/api/v1/tasks')
      .set('Authorization', `Bearer ${loggedInUser.body.data.token}`)
      .send({
        title: 'Logged in user task'
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);

    done();
  });

  it('throws error when guest is creating new task', async done => {
    const response = await request.post('/api/v1/tasks').send({
      title: 'Guest user task'
    });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);

    done();
  });

  // it('logged in user can update task', async done => {
  //   // Write test here
  //   done();
  // });

  // it('logged in user can delete task', async done => {
  //   // Write test here.
  //   done();
  // });

  // it('gets single task', async done => {
  //   // Write test here.
  //   done();
  // });
});
