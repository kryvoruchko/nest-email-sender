import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getCompanyById(id: number): Promise<Company> {
    return this.companyRepository.findOne({ id });
  }

  async getCompanyProjects(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['projects'] });
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const existingCompany = await this.getCompanyById(id);
    const company = {
      ...updateCompanyDto,
      id: existingCompany.id,
    };
    return this.getCompanyById(existingCompany.id);
  }
}
