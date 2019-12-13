import {
  Controller,
  Get,
  Param,
  UseGuards,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Project } from '../projects/project.entity';
import { UsersProjectsService } from '../users-projects/users-projects.service';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('Users')
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersProjectsService: UsersProjectsService,
  ) {}

  @Get()
  @ApiOperation({ description: 'Get all users' })
  @ApiResponse({ status: 200, type: User, isArray: true })
  getUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Post()
  @ApiOperation({ description: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  create(@Body() createUser: User): Promise<User> {
    return this.usersService.create(createUser);
  }

  @Get('/:id')
  @ApiOperation({ description: 'Get user by ID' })
  @ApiResponse({ status: 200, type: User })
  update(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }

  @Put('/:id')
  @ApiOperation({ description: 'Update user' })
  @ApiResponse({ status: 200, type: UpdateUserDto })
  getProfileById(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: number,
  ): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Get('/:userId/projects')
  @ApiResponse({ status: 200, type: Project, isArray: true })
  @ApiOperation({ description: 'Get all projects for user' })
  async getUserProjects(@Param('userId') userId: number): Promise<Project[]> {
    await this.usersService.findById(userId);
    return this.usersProjectsService.getUserProjects(userId);
  }

  @Get('/:userId/projects/:projectId')
  @ApiResponse({ status: 200, type: Project })
  @ApiOperation({ description: 'Get projects by ID for user' })
  async getCompanyProjectById(
    @Param('userId') userId: number,
    @Param('projectId') projectId: number,
  ): Promise<Project> {
    await this.usersService.findById(userId);
    return this.usersProjectsService.getUserProjectById(userId, projectId);
  }
}
