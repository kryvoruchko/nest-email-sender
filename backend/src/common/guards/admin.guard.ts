import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES } from 'src/utils/roles';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { user, company } = context.switchToHttp().getRequest();

    if (!user || !company) {
      return false;
    }

    // detect that current company is available for current user
    const userCompany = user.companies.find(
      userCompany => userCompany.company.id === company.id,
    );
    if (!userCompany) {
      return false;
    }

    // check user role in this company (access admin dashboard)
    return [ROLES.ADMIN, ROLES.SUPERADMIN].includes(
      <ROLES>userCompany.role.name,
    );
  }
}
