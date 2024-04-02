import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext): string => {
    const req = context.switchToHttp().getRequest();
    return req.user.userId;
  },
);
