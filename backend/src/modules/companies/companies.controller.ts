import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { Company } from './company.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
@ApiTags('Companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req): Promise<Company> {
    return this.companiesService.getCompanyById(1);
  }

  @Get('/projects')
  @UseGuards(AuthGuard('jwt'))
  getCompanyProjects(@Req() req): Promise<Company[]> {
    return this.companiesService.getCompanyProjects();
  }

  // @Put()
  // @UseGuards(AuthGuard('jwt'))
  // updateProfile(
  //   @Body() profile: UpdateProfileDto,
  //   @Req() req,
  // ): Promise<Profile> {
  //   return this.profileService.update(req.user.id, profile);
  // }
}
