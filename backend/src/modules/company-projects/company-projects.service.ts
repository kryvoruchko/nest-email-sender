import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyProject } from './company-project.entity';
import { Repository } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Company } from '../companies/company.entity';

@Injectable()
export class CompanyProjectsService {
  constructor(
    @InjectRepository(CompanyProject)
    public readonly companyProjectRepository: Repository<CompanyProject>,
  ) {}

  create(companyId: number, projectId: number): Promise<CompanyProject> {
    const params = {
      company: {
        id: companyId,
      } as Company,
      project: {
        id: projectId,
      } as Project,
    };
    return this.companyProjectRepository.save(params);
  }

  async getCompanyProjectById(
    companyId: number,
    projectId: number,
  ): Promise<any> {
    return await this.companyProjectRepository
      .findOne(
        {
          company: { id: companyId },
          project: { id: projectId },
        },
        {
          relations: ['project'],
        },
      )
      .then(company => {
        if (!company || !company.project) {
          throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
        return company.project;
      });
  }

  async getCompanyProjects(companyId: number): Promise<any> {
    return await this.companyProjectRepository
      .find({
        relations: ['project'],
        where: { company: { id: companyId } },
      })
      .then(data => data.map(company => company.project));
  }
}
