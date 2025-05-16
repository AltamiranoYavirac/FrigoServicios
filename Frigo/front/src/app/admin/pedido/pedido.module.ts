import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaPedidoComponent } from './components/lista-pedido/lista-pedido.component';
import { NuevoPedidoComponent } from './components/nuevo-pedido/nuevo-pedido.component';
import { PrimengModule } from '../../primeng/primeng.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListaPedidoComponent,
    NuevoPedidoComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    FormsModule
  ]
})
export class PedidoModule { }
