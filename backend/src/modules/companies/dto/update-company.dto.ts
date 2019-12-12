import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @ApiProperty()
  readonly projectsId?: any;

  @ApiProperty()
  readonly usersId?: any;
}
