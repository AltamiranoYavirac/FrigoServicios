import { Module } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { formularioController } from './formulario.controller';
import { formularioProviders } from './formulario.provider';
import { DatabaseModule } from 'src/database/database.module';
import { formulario } from './entities/formulario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports:[TypeOrmModule.forFeature([formulario]), DatabaseModule],
  controllers: [formularioController],
  providers: [FormularioService, ...formularioProviders],
  exports: [FormularioService],
})
export class FormularioModule {}