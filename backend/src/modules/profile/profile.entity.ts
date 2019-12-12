import { ManyToOne, JoinColumn, Column, Entity, Index } from 'typeorm';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/base.entity';

@Entity('profiles')
@Index(['user'], { unique: true })
export class Profile extends BaseEntity {
  @ManyToOne(type => User)
  @JoinColumn({ name: 'userId' })
  @ApiProperty()
  user: User;

  @Column({ nullable: true })
  @ApiProperty()
  age: string;

  @Column({ nullable: true })
  @ApiProperty()
  location: string;

  @Column({ nullable: true })
  @ApiProperty()
  experience: string;

  @Column({ nullable: true })
  @ApiProperty()
  carrerLevel: string;

  @Column({ nullable: true })
  @ApiProperty()
  website: string;

  @Column({ nullable: true })
  @ApiProperty()
  info: string;
}
