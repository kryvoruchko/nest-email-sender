import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { CompaniesService } from '../companies/companies.service';
import { CompanyProjectsService } from '../company-projects/company-projects.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly companyProjectsService: CompanyProjectsService,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getProjectById(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({ id });
    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }
    return project;
  }

  async create(
    createProjectDto: CreateProjectDto,
    companyId: number,
  ): Promise<Project> {
    const newProject = await this.projectRepository.save(createProjectDto);
    await this.companyProjectsService.create(companyId, newProject.id);
    return this.getProjectById(newProject.id);
  }

  async delete(companyId: number, id: number): Promise<any> {
    await this.companyProjectsService.companyProjectRepository.delete({
      id,
      company: { id: companyId },
    });

    const result = await this.projectRepository.delete({ id });
    return result;
  }
}
