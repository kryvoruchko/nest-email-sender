import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginUser } from './interfaces/user-login.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { TokenService } from '../core/token.service';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly profileService: ProfileService,
  ) {}

  async validateUser(userLogin: LoginUser): Promise<any> {
    if (!userLogin || !userLogin.email) {
      throw new HttpException('Invalid email', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.findByEmail(userLogin.email);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      const { password, ...result } = user;
      return result;
    }
  }

  async refresh({ refreshToken }: RefreshTokenDto): Promise<any> {
    try {
      const { email } = await this.tokenService.verify(refreshToken);

      // const user = await this.usersService.getByEmailAndRefresh(
      //   email,
      //   refreshToken,
      // );
      const user = {};
      if (!user) {
        throw new Error('User not found');
      }

      const newRefreshToken = this.tokenService.signRefreshToken(email);

      // return this.usersService.updateRefresh(user.id, newRefreshToken);
      return { id: 1, email: 'asd', firstName: 'asd', lastName: 'asd' };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(user: LoginUser): Promise<any> {
    return this.validateUser(user).then((userData: User) => {
      let payload = { email: userData.email, sub: userData.id };
      const accessToken = this.jwtService.sign(payload);

      return {
        expires_in: 7200,
        access_token: accessToken,
        user: userData,
        status: 200,
      };
    });
  }

  async registration(registrationUser: User): Promise<any> {
    const user = await this.usersService.findByEmail(registrationUser.email);
    if (user) {
      throw new HttpException('User created', HttpStatus.BAD_REQUEST);
    }
    const newUser = this.usersService.create(registrationUser);
    newUser.then(data => this.profileService.create({ user: { id: data.id } }));
    return newUser;
  }
}
