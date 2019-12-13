import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Projects')
@UseGuards(AuthGuard('jwt'))
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ description: 'Get all projects' })
  @ApiResponse({ status: 200, type: Project, isArray: true })
  getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get project by ID' })
  @ApiResponse({ status: 200, type: Project })
  getProjectById(@Param('id') id: number): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }
}
