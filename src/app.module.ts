/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { ClubModule } from './club/club.module';
import { MemberEntity } from './member/member.entity';
import { ClubEntity } from './club/club.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubMemberModule } from './club-member/club-member.module';

@Module({
  imports: [ MemberModule, ClubModule, ClubMemberModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'member',
      entities: [MemberEntity, ClubEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
