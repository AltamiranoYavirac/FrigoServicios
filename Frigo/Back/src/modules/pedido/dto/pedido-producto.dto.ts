import { IsNumber } from "class-validator";

export class PedidoProductoDto{
    @IsNumber()
    pedidoId: number; //cada producto que vayamos registrando el nuemro de pedido se mantiene 

    @IsNumber()
    productoId: number; //el id del producto si puede cambiar el : 3-5-6

    @IsNumber()
    cantidad: number; //minimo es 1
}