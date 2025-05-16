import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  standalone: true,
  imports: [TableModule, ButtonModule, DialogModule]
})
export class ReporteComponent {
  visible: boolean = false;

  showDialog() {
      this.visible = true;
  }

  products!: any[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.http.get<any[]>('http://localhost:3000/clientes').subscribe({
      next: (data) => {
        this.products = data;
        console.log('Clientes recibidos:', this.products);
      },
      error: (error) => {
        alert('Error al obtener los clientes');
        console.error(error);
      }
    });
  }
}
