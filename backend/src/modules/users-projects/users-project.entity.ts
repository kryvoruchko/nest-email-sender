import { Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Entity('users_projects')
@Index(['user', 'project'], { unique: true })
export class UsersProject extends BaseEntity {
  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(type => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
