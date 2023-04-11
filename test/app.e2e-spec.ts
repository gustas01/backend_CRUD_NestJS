import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Role } from '../src/enums/role.enum';
import { authRegisterDTOMock } from '../src/testing/auth-register-dto.mock';
import dataSource from '../typeorm/data-source';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string
  let userId: number

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close()
  })

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('Creating a user', async() => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(authRegisterDTOMock)
      
      expect(response.statusCode).toEqual(201)
      expect(typeof response.body.token).toBe('string')
  });

  it('login with the new user', async() => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: authRegisterDTOMock.email,
        password: authRegisterDTOMock.password,
      })
      
      expect(response.statusCode).toEqual(201)
      expect(typeof response.body.token).toBe('string')

      token = response.body.token
  });

  it('getting the user data', async() => {
    const response = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .send()
      
      expect(response.statusCode).toEqual(201)
      expect(typeof response.body.id).toBe('number')
      expect(response.body.role).toBe(Role.User)
  });

  it('Trying to register a Admin and failing', async() => {
    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .set('Authorization', `Bearer ${token}`)
      .send({...authRegisterDTOMock, role: Role.Admin, email: 'email@email.com'})

      token = response.body.token

      const userData = await request(app.getHttpServer())
      .post('/auth/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

      userId = userData.body.id
      
      expect(userData.statusCode).toEqual(201)
      expect(userData.body.role).toBe(Role.User)
  });


  it('Listing all users (index)', async() => {
    const response = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .send()
      
      expect(response.statusCode).toEqual(200)
  });


  it('Changing the role of user to Admin', async() => {
    const ds = await dataSource.initialize();
    const queryRunner = ds.createQueryRunner();

    await queryRunner.query(`UPDATE users SET role = ${Role.Admin} WHERE id = ${userId}`)
    const rows = await queryRunner.query(`SELECT * FROM users WHERE id = ${userId};`)

    dataSource.destroy()

    expect(rows.length).toEqual(1)
    expect(rows[0].role).toEqual(Role.Admin)
  });
});
