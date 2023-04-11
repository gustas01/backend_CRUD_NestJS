import { Test, TestingModule } from '@nestjs/testing';
import { authServiceMock } from '../../testing/auth-service.mock';
import { userServiceMock } from '../../testing/user-service.mock';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let authGuard: AuthGuard

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthGuard, authServiceMock, userServiceMock]
    }).compile()

    authGuard = module.get<AuthGuard>(AuthGuard)
  })
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });
});
