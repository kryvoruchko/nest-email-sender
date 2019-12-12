import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private readonly companiesService: CompaniesService,
  ) {}

  async getAllProjects(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  async getAllProjectsByUserId(userId: number): Promise<Project[]> {
    return [];
  }

  async getProjectById(id: number): Promise<Project> {
    return this.projectRepository.findOne({ id });
  }

  // company
  async create(
    createProjectDto: CreateProjectDto,
    userId: number,
  ): Promise<Project> {
    const project = {
      ...createProjectDto,
      company: { id: 1 },
    };
    const company = await this.companiesService.getCompanyById(1);
    const newProject = await this.projectRepository.save(project);
    this.companiesService.updateCompany(1, { projectsId: newProject.id });
    return this.getProjectById(newProject.id);
  }
}
