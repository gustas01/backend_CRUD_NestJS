import { JwtService } from "@nestjs/jwt";
import { jwtPayloadMock } from "./jwt-payload.mock";
import { tokenMock } from "./token.mock";

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
   sign: jest.fn().mockReturnValue(tokenMock),
   verify: jest.fn().mockReturnValue(jwtPayloadMock),
  }
}