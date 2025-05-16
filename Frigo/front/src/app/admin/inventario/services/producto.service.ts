import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  // si tu backend espera más campos, agrégalos aquí:
  // precio?: number;
  // stock?: number;
  // formularioId?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = environment.urlServidor + '/producto';
  private http = inject(HttpClient);

  // LISTAR (paginado)
  funListar(page = 1, limit = 10, q = ''): Observable<any> {
    return this.http.get(`${this.baseUrl}/back?page=${page}&limit=${limit}&q=${q}`);
  }

  // OBTENER UNO
  obtener(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/${id}`);
  }

  // CREAR
  crear(data: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.baseUrl}`, data);
  }

  // ACTUALIZAR
  actualizar(id: number, data: Partial<Producto>): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, data);
  }

  // ELIMINAR
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // (imagen ya la quitaste)
  // actualizarImagen(form: FormData, id: number) { … }
}
