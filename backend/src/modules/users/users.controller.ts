import { Controller, Get, Req, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  getUsers(): Promise<User[]> {
    return this.usersService.findAllUsers();
  }

  @Get('/:email')
  @UseGuards(AuthGuard('jwt'))
  getProfileByEmail(@Param('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Get('/:id')
  @UseGuards(AuthGuard('jwt'))
  getProfileById(@Param('id') id: number): Promise<User> {
    return this.usersService.findById(id);
  }
}
