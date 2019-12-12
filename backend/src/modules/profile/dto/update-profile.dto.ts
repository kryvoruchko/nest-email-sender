import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProfileDto {
  @IsString()
  @ApiProperty()
  readonly age?: string;

  @IsString()
  @ApiProperty()
  readonly location?: string;

  @IsString()
  @ApiProperty()
  readonly experience?: string;

  @IsString()
  @ApiProperty()
  readonly carrerLevel?: string;

  @IsString()
  @ApiProperty()
  readonly website?: string;

  @IsString()
  @ApiProperty()
  readonly info?: string;
}
