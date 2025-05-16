import { IsNumber ,IsOptional,IsString } from "class-validator";
import { PedidoProducto } from "../entities/pedidoproducto.entity";
import { PedidoProductoDto } from "./pedido-producto.dto";



export class CreatePedidoDto {
    @IsString()
    @IsOptional()
    fecha:string;

    @IsNumber()
    @IsOptional()
    estado:number;

    @IsString()
    @IsOptional()
    observaciones:string;


    public pedidoProductos: PedidoProductoDto[];

}

