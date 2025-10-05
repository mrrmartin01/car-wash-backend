import { Body, Controller, Get, Post } from '@nestjs/common';
import { MembershipService } from './membership.service';
import { MembershipDto } from './dto/member.dto';
import { ConfirmMembershipDto } from './dto/confirmMembership.dto';

@Controller('membership')
export class MembershipController {
  constructor(private readonly membershipService: MembershipService) {}

  @Get()
  getAllMemberships() {
    return this.membershipService.getAllMemberships();
  }

  @Post()
  createMembership(@Body() dto: MembershipDto) {
    return this.membershipService.createMembership(dto);
  }

  @Post('confirm-update')
  confirmMembershipUpdate(@Body() dto: ConfirmMembershipDto) {
    return this.membershipService.confirmMembershipUpdate(dto);
  }
}
