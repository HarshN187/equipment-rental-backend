import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector?: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector
      ? this.reflector.get(Roles, context.getHandler())
      : null;

    console.log(roles);

    if (!roles) {
      return true;
    }

    // if (roles.includes(request.user.role))
    return true;
    // else {
    // throw new UnauthorizedException();
    // Any exception thrown by a guard will be handled by the exceptions layer (global exceptions filter and any exceptions filters that are applied to the current context).
    //   return false;
    // }
  }
}
