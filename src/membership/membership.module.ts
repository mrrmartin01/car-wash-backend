import { Module } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipController } from './membership.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [MembershipService, PrismaService],
  controllers: [MembershipController],
})
export class MembershipModule {}
