import { BadGatewayException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Resend } from 'resend';
import { ContactMessageDto } from './contact-message.dto';

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

    const recipient = process.env.RECIPIENT_EMAIL ?? process.env.CONTACT_EMAIL ?? 'nicolas.psilvera@gmail.com';
    const sender = process.env.SENDER_EMAIL ?? process.env.RESEND_FROM ?? 'Portfolio Contact <onboarding@resend.dev>';
    const subject = data.subject?.trim() || `Nuevo contacto desde portfolio: ${data.name}`;
    const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!);

    try {
      const resend = new Resend(apiKey);
      const { data: result, error } = await resend.emails.send({
        from: sender,
        to: [recipient],
        replyTo: data.email,
        subject,
        html: `<div style="font-family:Arial,sans-serif;color:#221D26;line-height:1.5;max-width:600px;margin:auto;padding:24px;background:#F7F1E2;border:1px solid #221D26"><p style="color:#6A46E5;font-weight:bold">MENSAJE DE PORTFOLIO</p><h2>${escapeHtml(data.name)} te ha contactado</h2><p><strong>De:</strong> ${escapeHtml(data.name)} &lt;${escapeHtml(data.email)}&gt;</p><p><strong>Asunto:</strong> ${escapeHtml(subject)}</p><div style="white-space:pre-wrap;background:white;padding:16px;border:1px solid #D6CEBE">${escapeHtml(data.message)}</div><small>Enviado desde el portfolio de Nicolás Pereira · NestJS + Resend.</small></div>`,
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
