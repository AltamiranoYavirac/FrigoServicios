import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../admin/usuarios/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {
  // Variables para mostrar mensajes de error
  errorLogin = false;
  notRegistered = false;

  // Variables para el formulario de recuperación de contraseña
  forgotPasswordEmail: string = '';
  isForgotPasswordVisible: boolean = false;

  // Lista de roles disponibles
  roles = [
    { label: 'Cliente', value: 'client' },
    { label: 'Tecnico', value: 'technical' },
    { label: 'Administrador', value: 'admin' },
  ];
 
  // Formulario con validación
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    //rol: new FormControl(null, Validators.required)
  });

  // Constructor con inyección de dependencias
  constructor(
    private authService: AuthService,           // Inyectar AuthService
    private router: Router,                     // Inyectar Router
    private messageService: MessageService,     // Inyectar MessageService
    private userService: UserService
  ) {}

  // ✅ Validación personalizada de contraseña
  validPassword(password: string): boolean {
    return password.length >= 6 && /[^A-Za-z0-9]/.test(password);
  }

  // ✅ Ingreso al sistema
  funIngresar() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value || '';
    //const rol = this.loginForm.get('rol')?.value;

    if (!email || !email.includes('@')) {
      alert('El correo debe contener un @ válido');
      return;
    }

    if (!this.validPassword(password)) {
      alert('La contraseña debe tener al menos 6 caracteres y un carácter especial.');
      return;
    }

    /*if (!rol) {
      alert('Debes seleccionar un rol.');
      return;
    }*/

    this.errorLogin = false;
    this.notRegistered = false;

    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('access_token', res.token);
        this.userService.setUser(res.user); // Guardar el usuario en el servicio
        this.messageService.add({
          severity: 'success',
          summary: `¡Bienvenido!`,
          detail: 'Redirigiendo a tu panel...',
          icon: 'pi pi-user',
          life: 2500
        });

        setTimeout(() => {
          this.router.navigate(['/admin']); // Redirección
        }, 2500);
      },
      (error: any) => {
        console.log(error);
        if (error?.error?.message === 'Debes registrarte para poder ingresar') {
          this.notRegistered = true;

          setTimeout(() => {
            this.router.navigate(['auth/register']);
          }, 4000);
        } else {
          this.errorLogin = true;
        }
      }
    );
  }

  // ✅ Mostrar formulario de "Olvidaste tu contraseña"
  onForgotPassword(): void {
    this.isForgotPasswordVisible = true; // Esto activa la visibilidad del formulario de recuperación
  }

  // ✅ Enviar código de recuperación
  onSendRecoveryCode() {
    const email = this.forgotPasswordEmail;

    // Verifica si el correo es válido
    if (!this.validEmail(email)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo inválido',
        detail: 'Por favor ingresa un correo válido para recuperar la contraseña.',
        life: 3000
      });
      return;  // Detener la ejecución si el correo no es válido
    }

    // Si el correo es válido, llama al servicio para enviar el código
    this.authService.enviarPasswordPorCorreo(email).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Correo enviado',
          detail: `Te hemos enviado un código de recuperación a ${email}`,
          life: 4000
        });
        this.isForgotPasswordVisible = false; // Ocultar formulario de recuperación
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo enviar el código. Intenta más tarde.',
          life: 4000
        });
      }
    });
  }

  validEmail(email: string): boolean {
    return true;
  }
}
