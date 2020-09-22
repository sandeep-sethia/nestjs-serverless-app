import { Injectable } from '@nestjs/common';
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
}
