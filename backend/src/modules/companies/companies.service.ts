import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './company.entity';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async getCompanyById(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ id });
    if (!company) {
      throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
    }
    return company;
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    if (!createCompanyDto) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }
    return await this.companyRepository.save(createCompanyDto);
  }

  async updateCompany(
    id: number,
    updateCompanyDto: UpdateCompanyDto,
  ): Promise<Company> {
    const existingCompany = await this.getCompanyById(id);
    const company = {
      ...updateCompanyDto,
      id: existingCompany.id,
    } as Company;
    this.companyRepository.save(company);
    return this.getCompanyById(existingCompany.id);
  }
}
