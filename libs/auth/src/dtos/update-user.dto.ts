import { PartialType as SwaggerPartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdateUserSwaggerDto extends SwaggerPartialType(CreateUserDto) {}
