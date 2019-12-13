import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorInterceptor } from './common/interceptors/error.interceptor';
import { RolesModule } from './modules/roles/roles.module';
import { ProfileModule } from './modules/profile/profile.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { CompaniesUsersModule } from './modules/companies-users/companies-users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { UsersProjectsModule } from './modules/users-projects/users-projects.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(),
    RolesModule,
    ProfileModule,
    CompaniesModule,
    CompaniesUsersModule,
    ProjectsModule,
    UsersProjectsModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
