import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [MessageService],
})
export class ForgotPasswordComponent {
  forgotForm: FormGroup;

  constructor(private fb: FormBuilder, private messageService: MessageService, private router: Router, ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendRecoveryCode() {
    if (this.forgotForm.invalid) return;

    const email = this.forgotForm.value.email;
    const recoveryCode = Math.floor(100000 + Math.random() * 900000); // random 6-digit code

    // For now, just show a toast
    this.messageService.add({
      severity: 'success',
      summary: 'Código enviado',
      detail: `Se ha enviado un código de recuperación a ${email} (código: ${recoveryCode})`,
    });

    setTimeout(() => {
      this.router.navigate(['/auth/change-password']); // Redirección
    }, 2500);

    // TODO: Integrate with your backend email service
  }
}
