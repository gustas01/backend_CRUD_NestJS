import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass()
    ]);

    //quer dizer que aquela rota não tem regras para acessá-la, ou seja, qualquer um pode acessar
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    const rolesFiltered = requiredRoles.some(
      (role: number) => role <= user.role
    );

    // console.log({ requiredRoles, user });
    return rolesFiltered;
  }
}
