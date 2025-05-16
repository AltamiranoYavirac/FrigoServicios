import { Test, TestingModule } from '@nestjs/testing';
import { formularioController } from './formulario.controller';
import { FormularioService } from './formulario.service';

describe('formularioController', () => {
  let controller: formularioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [formularioController],
      providers: [FormularioService],
    }).compile();

    controller = module.get<formularioController>(formularioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
