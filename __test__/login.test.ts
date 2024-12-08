import request from 'supertest'; // Import Supertest
import app from '../src/Server'; // Import your Express app
import { ProjectDB, ormProject } from '../src/sequelize/index'; // If you need Sequelize connection for DB setup
import bcrypt from "bcryptjs";

let UserAuthenticationFactory = ProjectDB.UserAuthentication;

describe('POST /login', () => {
//   beforeAll(async () => {
//     // Any setup before tests (e.g., clear test DB, seed data, etc.)
//     await ormProject.sync({ force: true }); // Sync the database (if necessary)
//   });

  afterAll(async () => {
    // Clean up any resources after all tests have run (e.g., close DB connection)
    await ormProject.close();
  });

  it('should return 200 and authenticate user with valid credentials', async () => {
    // Seed a test user (this is an example, adjust accordingly to your DB setup)
    const user = await UserAuthenticationFactory.create({
      username: 'ksolanki6269',
      passwordHash: await bcrypt.hash('ksolanki#6269', 10), // Use a hashed password
      role_id: 1,
      email : "testcase@gmail.com"
    });

    const response = await request(app)
      .post('/login')
      .send({
        username: 'ksolanki6269',
        password: 'ksolanki#6269',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User authenticated');
    expect(response.body.data.accessToken).toBeDefined();
    expect(response.body.data.username).toBe(user.username);
    expect(response.body.data.role).toBe(user.role_id);
  });

  it('should return 401 for invalid credentials (wrong password)', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'ksolanki6269',
        password: 'wrongPassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  it('should return 404 if user not found', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'nonExistentUser',
        password: 'somePassword',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });

  it('should return 400 if validation fails (missing username or password)', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: '', // Missing username
        password: '',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User Profile's validation error");
    expect(response.body.data.length).toBeGreaterThan(0); // Validation error should be present
  });

  it('should handle server errors gracefully', async () => {
    // Mocking an error in the controller
    const mockError = jest.fn().mockImplementation(() => {
      throw new Error('Test server error');
    });
    jest.spyOn(UserAuthenticationFactory, 'findOne').mockImplementation(mockError);

    const response = await request(app)
      .post('/login')
      .send({
        username: 'ksolanki6269',
        password: 'ksolanki#6269',
      });

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Server error');
  });
});