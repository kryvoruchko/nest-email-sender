import {
  Controller,
  Get,
  UseGuards,
  Post,
  HttpException,
  HttpStatus,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Project } from '../projects/project.entity';
import { CompanyProjectsService } from '../company-projects/company-projects.service';
import { CreateProjectDto } from '../projects/dto/create-project.dto';
import { ProjectsService } from '../projects/projects.service';

@ApiBearerAuth()
@ApiTags('Companies')
@UseGuards(AuthGuard('jwt'))
@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly companyProjectsService: CompanyProjectsService,
    private readonly projectsService: ProjectsService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Get all companies' })
  @ApiResponse({ status: 200, type: Company, isArray: true })
  getAllCompanies(): Promise<Company[]> {
    return this.companiesService.getAllCompanies();
  }

  @Get('/:companyId')
  @ApiOperation({ description: 'Get company by ID' })
  @ApiResponse({ status: 200, type: Company })
  getCompanyById(@Param('companyId') companyId: number): Promise<Company> {
    return this.companiesService.getCompanyById(companyId);
  }

  @Get('/:companyId/projects')
  @ApiResponse({ status: 200, type: Project, isArray: true })
  @ApiOperation({ description: 'Get all projects for company' })
  async getCompanyProjects(
    @Param('companyId') companyId: number,
  ): Promise<Project[]> {
    await this.companiesService.getCompanyById(companyId);
    return this.companyProjectsService.getCompanyProjects(companyId);
  }

  @Post('/:companyId/projects')
  @ApiResponse({ status: 200, type: Project })
  @ApiOperation({ description: 'Create project for company' })
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Param('companyId') companyId: number,
  ): Promise<Project> {
    await this.companiesService.getCompanyById(companyId);
    return this.projectsService.create(createProjectDto, companyId);
  }

  @Get('/:companyId/projects/:projectId')
  @ApiResponse({ status: 200, type: Project })
  @ApiOperation({ description: 'Get projects by ID for company' })
  async getCompanyProjectById(
    @Param('companyId') companyId: number,
    @Param('projectId') projectId: number,
  ): Promise<Project> {
    await this.companiesService.getCompanyById(companyId);
    return this.companyProjectsService.getCompanyProjectById(
      companyId,
      projectId,
    );
  }

  @Delete('/:companyId/projects/:projectId')
  @ApiResponse({ status: 200 })
  @ApiOperation({ description: 'Delete project for company' })
  async deleteProject(
    @Param('companyId') companyId: number,
    @Param('projectId') projectId: number,
  ): Promise<Project> {
    await this.companiesService.getCompanyById(companyId);
    await this.companyProjectsService.getCompanyProjectById(
      companyId,
      projectId,
    );
    return this.projectsService.delete(companyId, projectId);
  }

  @Post()
  @ApiResponse({ status: 200, type: Company })
  @ApiOperation({ description: 'Create company' })
  create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }

  @Put('/:companyId')
  @ApiResponse({ status: 200, type: Company })
  @ApiOperation({ description: 'Update company' })
  updateCompany(
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Param('companyId') companyId: number,
  ): Promise<Company> {
    return this.companiesService.updateCompany(companyId, updateCompanyDto);
  }
}
