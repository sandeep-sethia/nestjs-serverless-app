import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity'
import { UserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async getAllUsers() : Promise<User[]> {
        return await this.userRepository.find();
    }

    async deleteUser(email: string): Promise<void> {
        await this.userRepository.delete({
            email: email
        });
    }

    async addNewUser(userDto: UserDto): Promise<User> {
        console.log('user Dto = ', userDto);
        let user: User = new User();
        user.org_id = 1;
        user.name = userDto.name;
        user.email = userDto.email;
        return await this.userRepository.save(user);
    }

    async updateUser(email: string, name: string, orgId: number): Promise<User> {
        if(orgId ===null && name === null) {
            throw new BadRequestException(
                'both orgId and name can not be null',
              );
        }
        let user: User = await this.userRepository.findOne({
            email: email
        })
        if(null === user) {
            throw new BadRequestException(
                'no such user exist',
              );            
        }
        if(orgId) {
            user.org_id = orgId;
        }
        if(name) {
            user.name = name;
        }
        user.updated_at = new Date();
        return await this.userRepository.save(user);
    }
}
