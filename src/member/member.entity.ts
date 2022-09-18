/* eslint-disable prettier/prettier */
import { ClubEntity } from '../club/club.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class MemberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  birthdate: string;

  @ManyToMany(() => ClubEntity, (club) => club.members)
  @JoinTable()
  clubs: ClubEntity[];
}
