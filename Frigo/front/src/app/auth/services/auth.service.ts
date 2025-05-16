import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/auth'; // Asegúrate de que este sea el puerto correcto

  constructor(private http: HttpClient) {}

  private usersData: any;

  // ✅ Login
  loginConNest(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        this.usersData = res.data;
      })
    );
  }

  // ✅ Obtener datos del usuario guardado (opcional)
  getuserData() {
    return this.usersData;
  }

  // ✅ Enviar enlace de recuperación al correo
  enviarPasswordPorCorreo(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  // ✅ Alias más legible
  forgotPassword(email: string): Observable<any> {
    return this.enviarPasswordPorCorreo(email);
  }

  // ✅ Cambiar la contraseña usando el token del link
  changePassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/change-password`, {
      token,
      password
    });
  }
}
