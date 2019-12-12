import {
  Controller,
  Param,
  Get,
  UseGuards,
  Req,
  Post,
  Body,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { create } from 'istanbul-reports';
import { CreateProjectDto } from './dto/create-project.dto';

@ApiBearerAuth()
@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getAllProjects(): Promise<Project[]> {
    return this.projectsService.getAllProjects();
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  getAllProjectsByUserId(@Req() req): Promise<Project[]> {
    return this.projectsService.getAllProjectsByUserId(req.user.id);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getProjectById(@Param('id') id: number): Promise<Project> {
    return this.projectsService.getProjectById(id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req,
  ): Promise<Project> {
    return this.projectsService.create(createProjectDto, req.user.id);
  }

  // @Put()
  // @UseGuards(AuthGuard('jwt'))
  // updateProfile(
  //   @Body() profile: UpdateProfileDto,
  //   @Req() req,
  // ): Promise<Profile> {
  //   return this.profileService.update(req.user.id, profile);
  // }
}
