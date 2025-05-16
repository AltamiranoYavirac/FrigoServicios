import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService]
})
export class RegisterComponent {
  formData = {
    name: '',
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit() {
    const email = this.formData.email;
    const password = this.formData.password;

   

    // Validación de contraseña
    if (!this.validPassword(password)) {
      this.messageService.add({
        severity: 'error',
        summary: 'Contraseña inválida',
        detail: 'Debe tener mínimo 6 caracteres y al menos un carácter especial.',
        life: 3000
      });
      return;
    }

    console.log(this.formData)
    // Envío al backend
    this.http.post('http://localhost:3000/auth/register', this.formData).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: '¡Registro exitoso!',
          detail: 'Serás redirigido al login...',
          icon: 'pi pi-check-circle',
          life: 3500
        });

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (err) => {
        console.error(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al registrar el usuario.',
          life: 3000
        });
      }
    });
  }

  

  validPassword(password: string): boolean {
    return password.length >= 6 && /[^A-Za-z0-9]/.test(password);
  }

 
}
