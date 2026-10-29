import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactMessageDto } from './contact-message.dto';
import { ContactService } from './contact.service';

@Controller()
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Get()
  root() {
    return { status: 'online', service: 'Portfolio Email API', endpoints: { send_email: 'POST /api/send-email', health: 'GET /health' } };
  }

  @Get('health')
  health() {
    return this.contactService.health();
  }

  @Post('api/send-email')
  sendEmail(@Body() data: ContactMessageDto) {
    return this.contactService.send(data);
  }
}
