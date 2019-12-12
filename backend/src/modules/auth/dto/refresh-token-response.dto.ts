import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenResponseDto {
  @IsString()
  @ApiProperty()
  readonly accessToken: string;

  @IsString()
  @ApiProperty()
  readonly refreshToken: string;
}
