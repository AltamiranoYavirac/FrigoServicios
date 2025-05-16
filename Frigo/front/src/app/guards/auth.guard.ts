import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


interface TokenPayload {
  role: string;
  // Agrega más campos si tu token los tiene
}

export function authGuard(expectedRole: string): CanActivateFn {
  return (route, state) => {
    console.log("***GUARD AUTH ACTIVADO***");

    const router = inject(Router);
    const token = localStorage.getItem("access_token") || "";

    if (token.length === 0) {
      router.navigate(["/auth/login"]);
      return false;
    }

    try {
      const decoded: TokenPayload = jwtDecode(token);

      if (decoded.role === expectedRole || decoded.role==="admin") {
        return true;
      } else {
        console.warn("Rol no autorizado");
        router.navigate(["/unauthorized"]);
        return false;
      }
    } catch (err) {
      console.error("Token inválido:", err);
      router.navigate(["/auth/login"]);
      return false;
    }
  };
}
