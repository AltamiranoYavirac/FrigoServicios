import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterAuthDto) {
    return this.authService.funRegister(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginAuthDto) {
    return this.authService.login(dto);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.authService.recuperarContraseña(email);
  }

  @Post('change-password')
  @HttpCode(204) // Código 204 No Content, sin cuerpo
  async changePassword(@Body() body: { token: string; password: string }): Promise<void> {
    const { token, password } = body;
    await this.authService.changePasswordWithToken(token, password);
  }
}
