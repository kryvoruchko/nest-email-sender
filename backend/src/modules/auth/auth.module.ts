import { Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    UsersModule,
    ProfileModule,
    CoreModule,
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey: 'test-jwt-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
