import { MemberEntity } from 'src/member/member.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class ClubEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  fechaFundacion: string;

  @Column()
  imagen: string;

  @Column()
  descripcion: string;

  @ManyToMany(() => MemberEntity, (member) => member.clubs)
  members: MemberEntity[];
}
