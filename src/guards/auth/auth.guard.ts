import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const payload = this.authService.checkToken(authorization?.split(' ')[1]);

      request.tokenPayload = payload;
      request.user = await this.userService.read(payload.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
