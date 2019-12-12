import {
  Controller,
  Get,
  UseGuards,
  Param,
  Req,
  Put,
  Body,
} from '@nestjs/common';
import { Profile } from './profile.entity';
import { ProfileService } from './profile.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Req() req): Promise<Profile> {
    return this.profileService.getProfileByUserId(req.user.id);
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  updateProfile(
    @Body() profile: UpdateProfileDto,
    @Req() req,
  ): Promise<Profile> {
    return this.profileService.update(req.user.id, profile);
  }
}
