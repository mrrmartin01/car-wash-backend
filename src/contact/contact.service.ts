import { BadRequestException, Injectable } from '@nestjs/common';
import { RecieveContactDto } from './dto/recieveContact.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async recieveContact(dto: RecieveContactDto): Promise<{ message: string }> {
    const { name, email, message } = dto;
    if (!name || !email || !message)
      throw new BadRequestException('All fields are required');
    if (dto !== Object(dto))
      throw new BadRequestException('Invalid data format');
    await this.prisma.contact.create({
      data: {
        name,
        email,
        message,
      },
    });
    return Promise.resolve({
      message: 'Contact message received successfully',
    });
  }

  async getAllContacts(): Promise<
    {
      id: string;
      name: string;
      email: string;
      message: string;
      createdAt: Date;
    }[]
  > {
    return this.prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
