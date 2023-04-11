import { AuthService } from "../auth/auth.service";
import { jwtPayloadMock } from "./jwt-payload.mock";
import { token } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockResolvedValue({ token }),
    checkToken: jest.fn().mockResolvedValue(jwtPayloadMock),
    login: jest.fn().mockResolvedValue({ token }),
    forget: jest.fn().mockResolvedValue({success: true}),
    reset: jest.fn().mockResolvedValue({ token }),
    register: jest.fn().mockResolvedValue({ token }),
    isTokenValid: jest.fn().mockResolvedValue(true),
  }
}