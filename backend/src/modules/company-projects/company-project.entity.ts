import { Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/base.entity';
import { Project } from '../projects/project.entity';
import { Company } from '../companies/company.entity';

@Entity('company_projects')
@Index(['company', 'project'], { unique: true })
export class CompanyProject extends BaseEntity {
  @ManyToOne(type => Company)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @ManyToOne(type => Project)
  @JoinColumn({ name: 'projectId' })
  project: Project;
}
