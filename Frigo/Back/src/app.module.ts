import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { FormularioModule } from './modules/formulario/formulario.module';
import { PersonaModule } from './modules/persona/persona.module';
import { ProductoModule } from './modules/producto/producto.module';
import { RoleModule } from './modules/role/role.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { ClienteModule } from './modules/cliente/cliente.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal:true,
     
}),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: false,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASS'),
          },
        },
        defaults: {
          from: `"Frigoservicios" <${configService.get<string>('MAIL_USER')}>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),

    AuthModule,
    UsersModule,
    DatabaseModule,
    FormularioModule,
    PersonaModule,
    ProductoModule,
    RoleModule,
    ClienteModule,
    PedidoModule,
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
