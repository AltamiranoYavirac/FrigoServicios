// src/app/admin/usuarios/usuarios.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

interface User {
  id?: number;
  name?: string;
  email?: string;
  role?: string;           // <-- añadimos role
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
})
export class UsuariosComponent implements OnInit {
  users: User[] = [];
  loading = false;

  // diálogo de edición
  userDialog = false;
  user: User = {} as User;

  // Lista estática de roles
  roles = [
    { label: 'Admin',    value: 'admin'    },
    { label: 'Client',   value: 'client'   },
    { label: 'Technical', value: 'technical' }
  ];

  private readonly apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  private loadUsers(): void {
    this.loading = true;
    this.http.get<User[]>(this.apiUrl)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: data => this.users = data,
        error: err => console.error('Error al cargar usuarios', err)
      });
  }

  showEditUserDialog(u: User): void {
    this.user = { ...u };      // clonamos
    this.userDialog = true;
  }

  saveUser(): void {
    if (!this.user.id) {
      return;
    }

    this.http
      .patch(
        `${this.apiUrl}/${this.user.id}`,
        this.user,
        { responseType: 'text' }
      )
      .subscribe({
        next: () => {
          this.userDialog = false;
          window.location.reload();
        },
        error: err => console.error('Error al actualizar usuario', err)
      });
  }

  deleteUser(u: User): void {
    this.http
      .delete(`${this.apiUrl}/${u.id}`, { responseType: 'text' })
      .subscribe({
        next: () => window.location.reload(),
        error: err => console.error('Error al borrar usuario', err)
      });
  }
}
