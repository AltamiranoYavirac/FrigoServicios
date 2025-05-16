import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { UserService }   from '../usuarios/user.service';

interface MenuItem {
  label: string;
  icon:  string;
  routerLink: any[];
  target?: string;
  allowedRoles: string[];
}

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  userRole = '';
  model: MenuItem[]         = [];
  filteredModel: MenuItem[] = [];

  constructor(
    public layoutService: LayoutService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.userService.getUser();
    if (!user || !user.role) {
      console.error('No se encontró el rol en UserService.');
      return;
    }
    this.userRole = user.role;

    this.model = [
      { label: 'Inicio',     icon: 'pi pi-fw pi-home',    routerLink: ['/admin'],           allowedRoles: ['client','technical','admin'] },
      { label: 'Formulario', icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/formulario'], allowedRoles: ['technical','admin'] },
      { label: 'Tickets',    icon: 'pi pi-fw pi-ticket',  routerLink: ['/admin/tickets'],   target:'_blank', allowedRoles: ['admin'] },
      {label: 'Tabla de tickets', icon:"pi pi-fw pi-table", routerLink: ['/admin/tickets-table'], target:'_blank', allowedRoles: ['admin']},
      { label: 'Usuarios',   icon: 'pi pi-fw pi-user',    routerLink: ['/admin/usuarios'],  allowedRoles: ['admin'] },
      { label: 'Reportes',   icon: 'pi pi-fw pi-folder',   routerLink: ['/admin/reporte'],   target:'_blank', allowedRoles: ['admin'] },
      { label: 'Clientes',   icon: 'pi pi-fw pi-id-card', routerLink: ['/admin/cliente'],   allowedRoles: ['client'] }
    ];

    // Filtramos los ítems permitidos para este rol
    this.filteredModel = this.model.filter(item =>
      item.allowedRoles.includes(this.userRole)
    );
  }
}
