import { AuthService } from "../auth/auth.service";
import { jwtPayloadMock } from "./jwt-payload.mock";
import { tokenMock } from './token.mock';

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockResolvedValue({ tokenMock }),
    checkToken: jest.fn().mockResolvedValue(jwtPayloadMock),
    login: jest.fn().mockResolvedValue({ tokenMock }),
    forget: jest.fn().mockResolvedValue({success: true}),
    reset: jest.fn().mockResolvedValue({ tokenMock }),
    register: jest.fn().mockResolvedValue({ tokenMock }),
    isTokenValid: jest.fn().mockResolvedValue(true),
  }
}