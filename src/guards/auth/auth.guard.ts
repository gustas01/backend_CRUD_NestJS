import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    try {
      const payload = this.authService.checkToken(authorization?.split(' ')[1]);

      request.tokenPayload = payload;

      return true;
    } catch (e) {
      return false;
    }
  }
}
