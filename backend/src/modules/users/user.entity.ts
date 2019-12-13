import * as crypto from 'crypto';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { ExclusionMetadata } from 'typeorm/metadata/ExclusionMetadata';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../companies/company.entity';
import { Project } from '../projects/project.entity';
import { UsersProject } from '../users-projects/users-project.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @ApiProperty()
  email: string;

  @Column()
  @ApiProperty()
  firstName: string;

  @Column()
  @ApiProperty()
  lastName: string;

  @Column()
  @ApiProperty()
  phone: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column()
  @ApiProperty()
  password: string;
}
