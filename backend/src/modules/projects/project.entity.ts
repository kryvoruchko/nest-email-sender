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
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('projects')
export class Project extends BaseEntity {
  @Column()
  @ApiProperty()
  name: string;
}
