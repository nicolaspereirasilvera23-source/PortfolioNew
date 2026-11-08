import { BadGatewayException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';
import { ContactMessageDto } from './contact-message.dto';

const FROM_EMAIL = 'Contact Nicolás <onboarding@resend.dev>';
const TO_EMAIL = 'nicolas.psilvera@gmail.com';

@Injectable()
export class ContactService {
  health() {
    return {
      status: 'healthy',
      resend_configured: Boolean(process.env.RESEND_API_KEY?.trim()),
    };
  }

  async send(data: ContactMessageDto) {
    const apiKey = process.env.RESEND_API_KEY?.trim();
    if (!apiKey || apiKey.startsWith('re_tu_api_key')) {
      throw new InternalServerErrorException('La variable RESEND_API_KEY no está configurada.');
    }

    const recipient = process.env.RECIPIENT_EMAIL ?? process.env.CONTACT_EMAIL ?? TO_EMAIL;
    const subject = (data.subject?.trim() || `Contacto de portfolio — ${data.name}`).replace(/[\r\n]+/g, ' ');
    const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);
    const html = `
      <h2>Nuevo mensaje desde el portfolio</h2>
      <ul>
        <li><strong>Nombre:</strong> ${escapeHtml(data.name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(data.email)}</li>
        <li><strong>Asunto:</strong> ${escapeHtml(subject)}</li>
      </ul>
      <p><strong>Mensaje:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, '<br />')}</p>
    `;

    try {
      const resend = new Resend(apiKey);
      const { data: result, error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: [recipient],
        replyTo: data.email,
        subject,
        html,
      });
      if (error) {
        console.error('[Resend] Email rejected:', { name: error.name, message: error.message });
        throw new BadGatewayException(`Resend rechazó el envío: ${error.message}`);
      }
      return { status: 'success', message: 'Correo enviado exitosamente.', data: result };
    } catch (error) {
      if (error instanceof BadGatewayException) throw error;
      console.error('[Resend] Request failed:', error instanceof Error ? error.message : 'Unknown error');
      throw new BadGatewayException('No se pudo conectar con Resend. Comprueba la API key y vuelve a intentar.');
    }
  }
}
