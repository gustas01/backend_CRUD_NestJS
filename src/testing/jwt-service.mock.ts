import { JwtService } from "@nestjs/jwt";
import { jwtPayloadMock } from "./jwt-payload.mock";
import { token } from "./token.mock";

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
   sign: jest.fn().mockReturnValue(token),
   verify: jest.fn().mockReturnValue(jwtPayloadMock),
  }
}