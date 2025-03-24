import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateUserDto, UpdateUserSwaggerDto } from '../dtos/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.userService.getUserById(id);
  }

  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    return await this.userService.getUserByUsername(username);
  }

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiBody({ type: UpdateUserSwaggerDto })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Put(':id')
  async updateUserById(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return await this.userService.updateUserById(id, data);
  }

  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    return await this.userService.deleteUserById(id);
  }
}
