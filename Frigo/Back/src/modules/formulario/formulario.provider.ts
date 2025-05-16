import { DataSource } from 'typeorm';
import { formulario } from './entities/formulario.entity';


export const formularioProviders = [
  {
    provide: 'FORMULARIO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(formulario),
    inject: ['DATABASE_CONNECTION'],
  },
];