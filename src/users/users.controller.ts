import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../dtos/user.dto';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) {}

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post()
    async provisionNewUser(
        @Body() userProvisionRequest : UserDto
    ) {
        console.log('request for create new user');
        return await this.userService.addNewUser(userProvisionRequest);
    }

    @Patch(':email')
    async updateUser(
        @Param('email') email: string,
        @Query('name') name: string,
        @Query('orgId') orgId: number
    ) {
        return this.userService.updateUser(email, name, orgId);
    }

    @Delete(':email')
    async deleteUser(
        @Param('email') email: string
    ) {
        return this.userService.deleteUser(email);
    }

}
