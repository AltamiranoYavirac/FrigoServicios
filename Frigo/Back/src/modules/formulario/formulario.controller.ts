import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { FormularioService } from './formulario.service';
import { CreateFormularioDto } from './dto/create-formulario.dto';
import { UpdateFormularioDto } from './dto/update-formulario.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import path from 'path';

@UseGuards(JwtAuthGuard)
@ApiTags('formulario')
@Controller('formulario')
export class formularioController {
  constructor(private readonly formularioService: FormularioService) {}

  @Post()
  create(@Body() createformularioDto: CreateFormularioDto) {
    return this.formularioService.create(createformularioDto);
  }

  @Get()
  findAll() {
    return this.formularioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formularioService.findOne(+id);
  }

  /*@Patch(':id')
  update
  (@Param('id') id: number,@Body()UpdateformularioDto:UpdateformularioDto) {
    return this.formularioService.update(+id,UpdateformularioDto);
  }*/

    @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateFormularioDto,
  ) {
    return this.formularioService.update(id, updateDto);
  }
    

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.formularioService.remove(+id);
  }



}
