import { Module } from '@nestjs/common';
import { CompanyProjectsService } from './company-projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyProject } from './company-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyProject])],
  providers: [CompanyProjectsService],
  exports: [CompanyProjectsService],
})
export class CompanyProjectsModule {}
