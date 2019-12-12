import { Column, Entity, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;

  @ManyToOne(
    type => User,
    user => user.companies,
  )
  users: User[];

  @ManyToOne(
    type => Project,
    project => project.company,
  )
  projects: Project[];
}
