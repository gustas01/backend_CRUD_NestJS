import { createParamDecorator } from '@nestjs/common/decorators';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const ParamId = createParamDecorator(
  (data: unknown, ctx: ExecutionContextHost) => {
    return Number(ctx.switchToHttp().getRequest().params.id);
  }
);
