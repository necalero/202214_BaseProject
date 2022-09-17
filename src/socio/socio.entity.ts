import { ClubEntity } from 'src/club/club.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class SocioEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  usuario: string;

  @Column()
  correo: string;

  @Column()
  fechaNacimiento: string;

  @ManyToMany(() => ClubEntity, (club) => club.socios)
  clubs: ClubEntity[];
}
