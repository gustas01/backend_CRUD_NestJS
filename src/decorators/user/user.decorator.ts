import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException
} from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (request.user) {
      if (data) return request.user[data];
      return request.user;
    } else
      throw new NotFoundException(
        'Usuário não existe na request. Use o AuthGuard para adicioná-lo'
      );
  }
);
