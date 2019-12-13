import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompaniesModule } from '../companies/companies.module';
import { CompanyProjectsService } from '../company-projects/company-projects.service';
import { CompanyProjectsModule } from '../company-projects/company-projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), CompanyProjectsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
