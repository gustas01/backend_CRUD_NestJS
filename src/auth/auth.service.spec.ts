import { Test, TestingModule } from '@nestjs/testing';
import { authRegisterDTOMock } from '../testing/auth-register-dto.mock';
import { jwtPayloadMock } from '../testing/jwt-payload.mock';
import { jwtServiceMock } from '../testing/jwt-service.mock';
import { mailerServiceMock } from '../testing/mailer-service.mock';
import { token } from '../testing/token.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { userRepositoryMock } from '../testing/user-repository.mock';
import { userServiceMock } from '../testing/user-service.mock';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock
      ]
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Token methods', () => {
    it('createToken', () => {
      const result = authService.createToken(userEntityList[0]);
      expect(result).toEqual({ token });
    });

    it('checkToken', () => {
      const result = authService.checkToken(token);
      expect(result).toEqual(jwtPayloadMock);
    });

    it('isTokenValid', () => {
      const result = authService.isTokenValid(token);
      expect(result).toEqual(true);
    });
  });

  describe('Authentication methods', () => {
    it('login', async () => {
      const result = await authService.login('gustavo@email.com', '123123AaBb');
      expect(result).toEqual({ token });
    });

    it('forget', async () => {
      const result = await authService.forget('gustavo@email.com');
      expect(result).toEqual({ success: true });
    });

    it('reset', async () => {
      const result = await authService.reset('111111Zz', token);
      expect(result).toEqual({ token });
    });

    it('register', async () => {
      const result = await authService.register(authRegisterDTOMock);
      expect(result).toEqual({ token });
    });
  });
});
