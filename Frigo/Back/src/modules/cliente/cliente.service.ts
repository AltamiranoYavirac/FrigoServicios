import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  create(dto: CreateClienteDto) {
    const cliente = this.clienteRepo.create(dto);
    return this.clienteRepo.save(cliente);
  }

  getAll(){
    return this.clienteRepo.find();
  }
}
