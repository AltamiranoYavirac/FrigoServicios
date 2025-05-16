import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets-table.component.html',
  styleUrls: ['./tickets-table.component.scss']
})
export class TicketsTableComponent implements OnInit {
  tickets: any[] = [];
  ticketsFiltrados: any[] = [];
  filtroNombre: string = '';
  filtroCorreo: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerTickets();
  }

  obtenerTickets() {
    this.http.get<any[]>('http://localhost:3000/tickets').subscribe(data => {
      this.tickets = data;
      this.ticketsFiltrados = data;
    });
  }

  filtrar() {
    this.ticketsFiltrados = this.tickets.filter(ticket =>
      ticket.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()) &&
      ticket.correo.toLowerCase().includes(this.filtroCorreo.toLowerCase())
    );
  }

  eliminar(id: number) {
    this.http.delete(`http://localhost:3000/tickets/${id}`).subscribe(() => {
      this.tickets = this.tickets.filter(t => t.id !== id);
      this.filtrar();
    });
  }
}

