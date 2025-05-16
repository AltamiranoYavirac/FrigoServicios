import { Inject, Injectable } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { PedidoProductoDto } from './dto/pedido-producto.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { Cliente } from '../cliente/entities/cliente.entity';
import { PedidoProducto } from './entities/pedidoproducto.entity';

@Injectable()
export class PedidoService {
  constructor(@InjectRepository(Pedido)private pedidoRepository:Repository<Pedido>,
              @InjectRepository(Cliente)private clienteRepository: Repository<Cliente>,
              @InjectRepository(PedidoProducto)private pedidoProductoRepository: Repository<PedidoProducto>){}

  async create(createPedidoDto: CreatePedidoDto) {

    const { pedidoProductos}=createPedidoDto;
    //console.log("Cliente:",cliente)
    //console.log("Productos:",pedipoProductos)
    const queryRunner = this.pedidoRepository.manager.connection.createQueryRunner()//PARA MANIPULAR PEDIDo
    await queryRunner.connect()
    await queryRunner.startTransaction()
    try{
      

      //registrar el pedido
      const nuevoPedido = this.pedidoRepository.create({
        fecha: new Date().toISOString(),
        estado: 1,
        observaciones: 'Nuevo pepido',
      })
      //guardar el pedido
      const pedidoGuardado = await queryRunner.manager.save(Pedido,nuevoPedido)//guarda el pedido en la bdd
      console.log("Pedido guardado:",pedidoGuardado)

      //asociar el pedido al cliente

      await Promise.all(
        pedidoProductos.map ((Producto)=>{    //preoceamos los pedidos que han llegado con map ya que es una matriz de productos
          console.log("PRODUCTOS", Producto)
        const nuevoPedidoProducto = this.pedidoProductoRepository.create({
          pedidoId: nuevoPedido.id,
          productoId: Producto.productoId,
          cantidad: Producto.cantidad,
        });
        return queryRunner.manager.save(PedidoProducto, nuevoPedidoProducto)
      })
      )

      //si se completa correctamente el proceso 

      await queryRunner.commitTransaction()//guarda el proseco en la bdd
      return pedidoGuardado; //retorna el pedido guardado


    }catch(e){
      console.log("..........ROLLBACK..........")
      await queryRunner.rollbackTransaction();
      throw e; //lanzemos el error
    }finally{
      await queryRunner.release()  //siempre se ejecuta si es correcto esta con error
    }
    return 'PEDIDO COMPLETADO'
  }

async findAll() {
  const pedidos = await this.pedidoRepository.find({
    relations: ['cliente', 'pedidoProductos', 'pedidoProductos.producto']
  });
  return pedidos.map((pedido) => ({
    id: pedido.id,
    fecha: pedido.fecha,
    estado: pedido.estado,
    observaciones: pedido.observaciones,
    //cliente: pedido.cliente
    productos: pedido.pedidoProductos.map((pedidoProducto) => ({
      id: pedidoProducto.id,
      cantidad: pedidoProducto.cantidad,
      nombre: pedidoProducto.producto.nombre,
      precio: pedidoProducto.producto.precio
    }))
  }));
}  

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
