import * as crypto from 'crypto';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { ExclusionMetadata } from 'typeorm/metadata/ExclusionMetadata';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Company } from '../companies/company.entity';
import { Project } from '../projects/project.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  @ApiProperty()
  email: string;

  // @Column()
  // @ApiProperty()
  // refreshToken: string;

  // @Column()
  // @Exclude()
  // passwordHash: string;

  @ManyToOne(
    type => Project,
    project => project.users,
  )
  projects: Project[];

  @ManyToOne(
    type => Company,
    company => company.users,
  )
  companies: Company[];

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
