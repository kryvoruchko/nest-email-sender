import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersProject } from './users-project.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Injectable()
export class UsersProjectsService {
  constructor(
    @InjectRepository(UsersProject)
    private readonly usersProjectRepository: Repository<UsersProject>,
  ) {}

  create(userId: number, projectId: number): Promise<UsersProject> {
    const params = {
      user: {
        id: userId,
      } as User,
      project: {
        id: projectId,
      } as Project,
    };
    return this.usersProjectRepository.save(params);
  }

  async getUserProjectById(userId: number, projectId: number): Promise<any> {
    return await this.usersProjectRepository
      .findOne(
        {
          user: { id: userId },
          project: { id: projectId },
        },
        {
          relations: ['project'],
        },
      )
      .then(user => {
        if (!user || !user.project) {
          throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
        }
        return user.project;
      });
  }

  async getUserProjects(userId: number): Promise<any> {
    return await this.usersProjectRepository
      .find({
        relations: ['project'],
        where: { user: { id: userId } },
      })
      .then(data => data.map(user => user.project));
  }
}
