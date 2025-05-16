import {
  Injectable,
  HttpException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { hash, compare } from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // ✅ Registro de usuario
  async funRegister(dto: RegisterAuthDto) {
    const hashedPassword = await hash(dto.password, 12);
    const userToSave = { ...dto, password: hashedPassword };
    return this.userRepository.save(userToSave);
  }

  // ✅ Login con JWT
  async login(dto: LoginAuthDto) {
    const user = await this.userRepository.findOne({ where: { email: dto.email } });
    if (!user) {
      throw new HttpException('Debes registrarte para poder ingresar', 404);
    }

    const isValidPassword = await compare(dto.password, user.password);
    if (!isValidPassword) {
      throw new HttpException('Password inválido', 401);
    }

    const payload = { email: user.email, role: user.role, id: user.id };
    const token = await this.jwtService.signAsync(payload);

    return { user, token };
  }

  // ✅ Enviar enlace de recuperación por correo
  async recuperarContraseña(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const token = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '15m' }
    );

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperación de contraseña - Frigoservicios',
      html: `
        <h2>Hola 👋</h2>
        <p>Haz clic en el siguiente enlace para cambiar tu contraseña:</p>
        <a href="http://localhost:4200/auth/change-password?token=${token}">
          Cambiar Contraseña
        </a>
        <p>Este enlace expirará en 15 minutos.</p>
        <hr />
        <p>Equipo de Frigoservicios</p>
      `,
    });

    return { message: 'Enlace de recuperación enviado al correo' };
  }

  // ✅ Cambiar la contraseña con token válido
  async changePasswordWithToken(token: string, newPassword: string): Promise<void> {
    try {
      const payload: any = await this.jwtService.verifyAsync(token);
      const user = await this.userRepository.findOne({ where: { id: payload.id } });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      const hashed = await hash(newPassword, 12);
      await this.userRepository.update(user.id, { password: hashed });

    } catch (err) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
