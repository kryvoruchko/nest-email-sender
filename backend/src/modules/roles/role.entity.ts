import { Entity, Column } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  name: string;
}
