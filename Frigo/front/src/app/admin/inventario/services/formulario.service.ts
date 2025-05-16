import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private baseUrl = environment.urlServidor
  private http= inject(HttpClient)

  funListar(){
    return this.http.get(`${this.baseUrl}/formulario`)
    
  }

  funGuardar(registro:any){
    return this.http.post(`${this.baseUrl}/formulario`, registro)
  }

  funModificar(id:number, registro:any){
    return this.http.patch(`${this.baseUrl}/formulario/${id}`,registro)
  }

  funEliminar(id: number): Observable<string> {
    return this.http.delete(
      `${this.baseUrl}/formulario/${id}`,
      { responseType: 'text' }
    );
  }
}
