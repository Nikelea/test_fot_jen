import { Repository } from 'typeorm';
import { Artist } from '@/entities/artist.entity';
import { AppDataSource } from '@/config/dataSource';
import { ArtistDto } from '@/dto/artist.dto';
import { IArtist } from '@/interfaces/IArtist.interface';

export class ArtistRepository extends Repository<Artist> {
  constructor() {
    super(Artist, AppDataSource.createEntityManager());
  }

  async getArtists(): Promise<IArtist[]> {
    return await this.find();
  }

  async createArtist(artistDto: ArtistDto): Promise<IArtist> {
    const artist = new Artist();
    artist.name = artistDto.name;
    artist.photo = artistDto.photo;
    artist.information = artistDto.information;
    await this.save(artist);

    return artist;
  }
}
