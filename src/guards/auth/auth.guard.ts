import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
import { UserService } from '../../users/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService
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
