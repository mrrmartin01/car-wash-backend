import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MembershipDto } from './dto/member.dto';
import { ConfirmMembershipDto } from './dto/confirmMembership.dto';

@Injectable()
export class MembershipService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMemberships(): Promise<MembershipDto[]> {
    const memberships = await this.prisma.membership.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return memberships;
  }

  async createMembership(dto: MembershipDto) {
    const existing = await this.prisma.membership.findUnique({
      where: { userEmail: dto.userEmail },
    });

    if (!existing) {
      return this.prisma.membership.create({ data: dto });
    }

    if (existing.planName === dto.planName) {
      return { status: 'exists', message: 'You are already on this plan.' };
    }

    return {
      status: 'confirm',
      message: `You already have ${existing.planName}. Confirm to switch to ${dto.planName}?`,
      currentPlan: existing.planName,
      requestedPlan: dto.planName,
    };
  }

  async confirmMembershipUpdate(dto: ConfirmMembershipDto) {
    return this.prisma.membership.update({
      where: { userEmail: dto.userEmail },
      data: { planName: dto.planName, price: dto.price },
    });
  }
}
