import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClubEntity } from 'src/club/club.entity';
import { MemberEntity } from 'src/member/member.entity';
import { Repository } from 'typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class ClubMemberService {
  constructor(
    @InjectRepository(MemberEntity)
    private readonly memberRepository: Repository<MemberEntity>,

    @InjectRepository(ClubEntity)
    private readonly clubRepository: Repository<ClubEntity>,
  ) {}

  async addMemberToClub(clubId: string, memberId: string): Promise<ClubEntity> {
    const member: MemberEntity = await this.memberRepository.findOne({
      where: { id: memberId },
    });
    if (!member)
      throw new BusinessLogicException(
        'The member with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const club: ClubEntity = await this.clubRepository.findOne({
      where: { id: clubId },
      relations: ['members'],
    });
    if (!club)
      throw new BusinessLogicException(
        'The club with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    club.members = [...club.members, member];
    return await this.clubRepository.save(club);
  }

  async findMemberFromClub(
    museumId: string,
    artworkId: string,
  ): Promise<ArtworkEntity> {
    const artwork: ArtworkEntity = await this.artworkRepository.findOne({
      where: { id: artworkId },
    });
    if (!artwork)
      throw new BusinessLogicException(
        'The artwork with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const museum: MuseumEntity = await this.museumRepository.findOne({
      where: { id: museumId },
      relations: ['artworks'],
    });
    if (!museum)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const museumArtwork: ArtworkEntity = museum.artworks.find(
      (e) => e.id === artwork.id,
    );

    if (!museumArtwork)
      throw new BusinessLogicException(
        'The artwork with the given id is not associated to the museum',
        BusinessError.PRECONDITION_FAILED,
      );

    return museumArtwork;
  }

  async findMembersFromClub(museumId: string): Promise<ArtworkEntity[]> {
    const museum: MuseumEntity = await this.museumRepository.findOne({
      where: { id: museumId },
      relations: ['artworks'],
    });
    if (!museum)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return museum.artworks;
  }

  async updateMembersFromClub(
    museumId: string,
    artworks: ArtworkEntity[],
  ): Promise<MuseumEntity> {
    const museum: MuseumEntity = await this.museumRepository.findOne({
      where: { id: museumId },
      relations: ['artworks'],
    });

    if (!museum)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    for (let i = 0; i < artworks.length; i++) {
      const artwork: ArtworkEntity = await this.artworkRepository.findOne({
        where: { id: artworks[i].id },
      });
      if (!artwork)
        throw new BusinessLogicException(
          'The artwork with the given id was not found',
          BusinessError.NOT_FOUND,
        );
    }

    museum.artworks = artworks;
    return await this.museumRepository.save(museum);
  }

  async deleteMemberFromClub(museumId: string, artworkId: string) {
    const artwork: ArtworkEntity = await this.artworkRepository.findOne({
      where: { id: artworkId },
    });
    if (!artwork)
      throw new BusinessLogicException(
        'The artwork with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const museum: MuseumEntity = await this.museumRepository.findOne({
      where: { id: museumId },
      relations: ['artworks'],
    });
    if (!museum)
      throw new BusinessLogicException(
        'The museum with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    const museumArtwork: ArtworkEntity = museum.artworks.find(
      (e) => e.id === artwork.id,
    );

    if (!museumArtwork)
      throw new BusinessLogicException(
        'The artwork with the given id is not associated to the museum',
        BusinessError.PRECONDITION_FAILED,
      );

    museum.artworks = museum.artworks.filter((e) => e.id !== artworkId);
    await this.museumRepository.save(museum);
  }
}
