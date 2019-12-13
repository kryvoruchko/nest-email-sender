import { Module } from '@nestjs/common';
import { UsersProjectsService } from './users-projects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProject } from './users-project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersProject])],
  providers: [UsersProjectsService],
  exports: [UsersProjectsService],
})
export class UsersProjectsModule {}
