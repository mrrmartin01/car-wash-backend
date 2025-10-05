import { Body, Controller, Get, Post } from '@nestjs/common';
import { RecieveContactDto } from './dto/recieveContact.dto';
import { ContactService } from './contact.service';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(
    @Body() dto: RecieveContactDto,
  ): Promise<{ message: string }> {
    return await this.contactService.recieveContact(dto);
  }
  @Get()
  async getAllContacts() {
    return this.contactService.getAllContacts();
  }
}
