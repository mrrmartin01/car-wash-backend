import { Injectable } from '@nestjs/common';
import { RecieveContactDto } from './dto/recieveContact.dto';

@Injectable()
export class ContactService {
  recieveContact(dto: RecieveContactDto): Promise<{ message: string }> {
    console.log(
      `Received contact from ${dto.name} (${dto.email}): ${dto.message}`,
    );
    return Promise.resolve({
      message: 'Contact message received successfully',
    });
  }
}
