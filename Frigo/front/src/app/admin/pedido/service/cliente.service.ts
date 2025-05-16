import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private baseUrl = environment.urlServidor
  private http= inject(HttpClient)

  funListar(){
    return this.http.get(`${this.baseUrl}/cliente`)
    
  }

  funGuardar(registro:any){
    return this.http.post(`${this.baseUrl}/cliente`, registro)
  }

  funModificar(id:number, registro:any){
    return this.http.patch(`${this.baseUrl}/cliente/${id}`,registro)
  }

  funEliminar(id:number){
    return this.http.delete(`${this.baseUrl}/cliente/${id}`);
  }

  buscarCliente(q:string){
    return this.http.get(`${this.baseUrl}/cliente/q/${q}`)
  }

  constructor() { }
}
