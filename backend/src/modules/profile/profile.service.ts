import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Profile } from './profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getProfileByUserId(userId: number): Promise<Profile> {
    return await this.profileRepository
      .createQueryBuilder('profile')
      .leftJoinAndSelect('profile.user', 'user')
      .where(`profile.user = :userId`, { userId })
      .getOne();
  }

  async getProfileById(id: number): Promise<Profile> {
    return await this.profileRepository.findOne({ id });
  }

  async update(
    userId: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const existingProfile = await this.getProfileByUserId(userId);
    if (!existingProfile) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
    const profile = {
      ...updateProfileDto,
      id: existingProfile.id,
    } as Profile;
    await this.profileRepository.save(profile);
    return await this.getProfileByUserId(userId);
  }

  async create(createdProfile: any): Promise<Profile> {
    if (!createdProfile) {
      throw new HttpException('BadRequest', HttpStatus.BAD_REQUEST);
    }
    return await this.profileRepository.save(createdProfile);
  }
}
