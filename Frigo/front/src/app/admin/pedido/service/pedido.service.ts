import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl= environment.urlServidor
  private http=inject(HttpClient)

  funListar(){
    return this.http.get(`${this.baseUrl}/pedido`)
  }

  funGuardar(registro:any){
    return this.http.post(`${this.baseUrl}/pedido`, registro)

  }

  constructor() { }
}
