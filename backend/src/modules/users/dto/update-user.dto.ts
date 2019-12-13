import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  readonly email?: string;

  @IsString()
  @ApiProperty()
  readonly firstName?: string;

  @IsString()
  @ApiProperty()
  readonly lastName?: string;

  @IsString()
  @ApiProperty()
  readonly phone?: string;
}
