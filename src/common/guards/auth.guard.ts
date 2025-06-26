import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Permission } from '../decorators/permission.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesPermission } from 'src/auth/entities/roles_permission.entity';
import { Repository } from 'typeorm';
import { RolesPermissionRepository } from 'src/auth/repository/rolesPermission.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly rolePermissionRepo: RolesPermissionRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const permission = this.reflector.get(Permission, context.getHandler());  
    if (!permission) {
      return true;
    }

    const role_permission = await this.rolePermissionRepo.allAsyncWithJoin(
      {
        role: { id: request.user.role },
        permission: { name: permission[0] },
      },
      {
        role: true,
        permission: true,
      },
    );

    console.log('this is role permisssion data :', role_permission);

    if (role_permission.length) return true;
    else {
      // throw new UnauthorizedException();
      // Any exception thrown by a guard will be handled by the exceptions layer (global exceptions filter and any exceptions filters that are applied to the current context).
      return false;
    }
  }
}
