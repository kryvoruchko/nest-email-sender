import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Entity('companies')
export class Company extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;
}
