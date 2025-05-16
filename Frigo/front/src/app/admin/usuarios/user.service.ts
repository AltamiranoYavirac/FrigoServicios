import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

interface TokenPayload {
  role: string;
  // aquí puedes agregar más campos si tu token los incluye
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userData: any = null;

  setUser(data: any): void {
    this.userData = data;
  }

  getUser(): TokenPayload | null {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return null;
    }
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      return decoded;
    } catch (e) {
      console.error('Error decodificando token:', e);
      return null;
    }
  }

  clearUser(): void {
    this.userData = null;
  }
}