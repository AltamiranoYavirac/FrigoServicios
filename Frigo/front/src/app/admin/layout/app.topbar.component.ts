import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

  @ViewChild('menubutton') menuButton!: ElementRef;
  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
  @ViewChild('topbarmenu') menu!: ElementRef;

  perfilItems: MenuItem[] = [];

  calendarVisible = false;
  selectedDate: Date = new Date();

  constructor(
    public layoutService: LayoutService,
    private router: Router
  ) {
    this.perfilItems = [
      {
        label: 'Calendario',
        icon: 'pi pi-calendar',
        command: () => {
          this.calendarVisible = true;
        }
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.cerrarSesion()
      }
    ];

  }

  cerrarSesion() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }
}


