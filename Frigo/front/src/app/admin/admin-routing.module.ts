// src/app/admin/admin-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsTableComponent }      from './tickets-table/tickets-table.component';
import { AppLayoutComponent }         from './layout/app.layout.component';
import { formularioComponent }         from './inventario/components/formulario/formulario.component';
import { ProductoComponent }          from './inventario/components/producto/producto.component';
import { NuevoPedidoComponent }       from './pedido/components/nuevo-pedido/nuevo-pedido.component';
import { ListaPedidoComponent }       from './pedido/components/lista-pedido/lista-pedido.component';
import { TicketsComponent }           from './tickets/tickets.component';
import { ClienteComponent }           from './cliente/cliente.component';
import { ReporteComponent }           from './reporte/reporte.component';
import { UsuariosComponent }          from './usuarios/usuarios.component';


import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'formulario',
        component: formularioComponent,
        canActivate: [ authGuard('technical') ]
      },
      {
        path: 'producto',
        component: ProductoComponent,
        canActivate: [ authGuard('technical') ]
      },
      {
        path: 'reporte',
        component: ReporteComponent,
        canActivate: [ authGuard('technical') ]
      },
      {
        path: 'cliente',
        component: ClienteComponent,
        canActivate: [ authGuard('client') ]
      },
      {
        path: 'pedido/nuevo',
        component: NuevoPedidoComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'pedido',
        component: ListaPedidoComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'tickets',
        component: TicketsComponent,
        canActivate: [ authGuard('client') ]
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: 'tickets-table',
        component: TicketsTableComponent,
        canActivate: [ authGuard('admin') ]
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class AdminRoutingModule {}
