import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { createHash, hash } from 'crypto';
import { console } from 'inspector';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository:Repository<User>){}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return this.userRepository.find({select:['id','name','email','role']});
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }
  
  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({id});
    if (!user){
      throw new BadRequestException('User not found');
    }
    
    const updateUser = this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(updateUser);
    return 'User updated successfully';
  }

  remove(id: number) {
    return this.userRepository.delete(id);
    
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async password(email: string, updateUserDto: UpdateUserDto) {
    const user = await this.findByEmail(email);
    
    if (!user) {
      throw new BadRequestException('User not found');
    }
    
    // Convertir roleId en objeto role si viene incluido
    const updateData: any = {
      ...updateUserDto,
      ...(updateUserDto.role && { role: { id: updateUserDto.role } }),
    };
    const hash = createHash('sha256').update(updateData.password.toString()).digest('hex');
    const newUser = { ...updateData, password: hash};
    const updatedUser = this.userRepository.merge(user, newUser);
    const response = await this.userRepository.save(updatedUser);

    return response;
  }
}
