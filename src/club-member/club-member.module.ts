import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubEntity } from 'src/club/club.entity';
import { MemberEntity } from 'src/member/member.entity';
import { ClubMemberService } from './club-member.service';
import { ClubMemberController } from './club-member.controller';


@Module({
  providers: [ClubMemberService],
  imports: [TypeOrmModule.forFeature([ClubEntity, MemberEntity])],
  controllers: [ClubMemberController],

})
export class ClubMemberModule {}
