import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @IsString()
  @ApiProperty()
  readonly name?: string;
}
