import { MemberEntity } from '../member/member.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  foundationDate: string;

  @Column()
  image: string;

  @Column()
  description: string;

  @ManyToMany(() => MemberEntity, (member) => member.clubs)
  @JoinTable()
  members: MemberEntity[];
}
