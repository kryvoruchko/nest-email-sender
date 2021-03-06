import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCompanyDto {
  @IsString()
  @ApiProperty()
  readonly name?: string;
}
