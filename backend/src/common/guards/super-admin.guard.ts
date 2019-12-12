import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES } from 'src/utils/roles';

@Injectable()
export class SuperAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, manager } = context.switchToHttp().getRequest();

    if (!user || !manager) {
      return false;
    }

    const userManager = user.managers.find(
      userCompany => userCompany.manager.id === manager.id,
    );
    if (!userManager) {
      return false;
    }

    return [ROLES.SUPERADMIN].includes(<ROLES>userManager.role.name);
  }
}
