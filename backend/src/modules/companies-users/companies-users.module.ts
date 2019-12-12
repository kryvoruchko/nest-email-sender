import { Module } from '@nestjs/common';
import { CompaniesUsersService } from './companies-users.service';

@Module({
  providers: [CompaniesUsersService]
})
export class CompaniesUsersModule {}
