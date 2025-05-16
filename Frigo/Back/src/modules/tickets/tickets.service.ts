import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TicketsService {
  async enviarCorreo(ticket: { nombre: string; correo: string; asunto: string; mensaje: string }) {
    try {
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

      await Promise.all([
        transporter.sendMail(mailToClient),
        transporter.sendMail(mailToSupport),
      ]);

      console.log(`✅ Correos enviados correctamente a:
- Cliente: ${ticket.correo}
- Soporte: ${process.env.MAIL_USER}`);

      return { message: 'Correos enviados al cliente y al soporte' };
    } catch (error) {
      console.error('❌ Error al enviar correos:', error);
      throw new Error('Error al enviar correos');
    }
  }
}

