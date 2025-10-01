import { Body, Controller, Post } from '@nestjs/common';
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
}
