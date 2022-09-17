/* eslint-disable prettier/prettier */
import { Controller, Post, Get, Put, Delete, UseInterceptors, Param, Body, HttpCode } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { MemberDto } from 'src/member/member.dto';
import { MemberEntity } from 'src/member/member.entity';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ClubMemberService } from './club-member.service';

@Controller('clubs')
@UseInterceptors(BusinessErrorsInterceptor)
export class ClubMemberController {
   constructor(private readonly clubMemberService: ClubMemberService){}

   @Post(':clubId/members/:memberId')
   async addMemberClub(@Param('clubId') clubId: string, @Param('memberId') memberId: string){
       return await this.clubMemberService.addMemberToClub(clubId, memberId);
   }

   @Get(':clubId/members/:memberId')
   async findMemberByClubIdMemberId(@Param('clubId') clubId: string, @Param('memberId') memberId: string){
       return await this.clubMemberService.findMemberFromClub(clubId, memberId);
   }

   @Get(':clubId/members')
   async findMembersByClubId(@Param('clubId') clubId: string){
       return await this.clubMemberService.findMembersFromClub(clubId);
   }

   @Put(':clubId/members')
   async associateMembersClub(@Body() membersDto: MemberDto[], @Param('clubId') clubId: string){
       const members = plainToInstance(MemberEntity, membersDto)
       return await this.clubMemberService.updateMembersFromClub(clubId, members);
   }

   @Delete(':clubId/members/:memberId')
    @HttpCode(204)
   async deleteMemberClub(@Param('clubId') clubId: string, @Param('memberId') memberId: string){
       return await this.clubMemberService.deleteMemberFromClub(clubId, memberId);
   }
}