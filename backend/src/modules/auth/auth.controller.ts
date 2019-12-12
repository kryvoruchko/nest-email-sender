import { Controller, Post, Body } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { LoginUser } from './interfaces/user-login.interface';
import { TokenService } from '../core/token.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshTokenResponseDto } from './dto/refresh-token-response.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    public readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  @Post('/login')
  async login(@Body() user: LoginUser): Promise<any> {
    return this.authService.login(user);
  }

  @Post('/registration')
  async registration(@Body() user: User): Promise<any> {
    return this.authService.registration(user);
  }

  @Post('/refresh')
  async refresh(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<RefreshTokenResponseDto> {
    try {
      const user = await this.authService.refresh(refreshTokenDto);
      const accessToken = this.tokenService.signAccessToken(user.email);

      return Promise.resolve({
        accessToken,
        refreshToken: user.refreshToken,
      } as RefreshTokenResponseDto);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
