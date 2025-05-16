import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ) {}

  async enviarCorreo(ticket: { nombre: string; correo: string; asunto: string; mensaje: string }) {
    try {
      // ✅ Guardar en base de datos
      await this.ticketRepository.save(ticket);

      // ✉️ Enviar correos
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      const mailToClient = {
        from: `"Frigo Soporte" <${process.env.MAIL_USER}>`,
        to: ticket.correo,
        subject: `📨 Hemos recibido tu ticket: ${ticket.asunto}`,
        text: `
Hola ${ticket.nombre},

Gracias por contactarnos. Hemos recibido tu mensaje:

"${ticket.mensaje}"

Nos pondremos en contacto contigo lo antes posible.

Saludos,
FrigoServicios
        `,
      };

      const mailToSupport = {
        from: `"Frigo Sistema" <${process.env.MAIL_USER}>`,
        to: process.env.MAIL_USER,
        subject: `🆕 Nuevo ticket recibido de ${ticket.nombre}`,
        text: `
Se ha generado un nuevo ticket:

Nombre: ${ticket.nombre}
Correo: ${ticket.correo}
Asunto: ${ticket.asunto}
Mensaje:
${ticket.mensaje}

Generado automáticamente desde el sistema.
        `,
      };

      await transporter.sendMail(mailToClient);
      await transporter.sendMail(mailToSupport);
    } catch (error) {
      console.error('Error al enviar o guardar el ticket:', error);
      throw error;
    }
  }

  // 🔍 Obtener todos los tickets
  async obtenerTodos(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  // 🗑 Eliminar ticket por ID
  async eliminar(id: number): Promise<void> {
    await this.ticketRepository.delete(id);
  }
}


