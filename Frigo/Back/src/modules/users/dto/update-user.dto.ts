import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/modules/common/enums/rol.enum';
import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()    
    @IsString()
    @MinLength(2)
    name?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()    
    @IsString()
    @MinLength(5)
    password?: string;
  
    @IsOptional()    
    identification?: number;
  
    @IsOptional()    
    @IsString()
    role?: Role;

}
