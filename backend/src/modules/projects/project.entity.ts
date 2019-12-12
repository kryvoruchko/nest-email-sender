import { Company } from '../companies/company.entity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  Index,
  Column,
  OneToMany,
  OneToOne,
  ManyToMany,
} from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('projects')
export class Project extends BaseEntity {
  @ManyToOne(
    type => User,
    user => user.projects,
  )
  @ApiProperty()
  users: User[];

  @ManyToOne(
    type => Company,
    company => company.projects,
  )
  @ApiProperty()
  company: Company;

  @Column()
  @ApiProperty()
  name: string;
}
