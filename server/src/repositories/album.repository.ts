import { Repository } from 'typeorm';
import { AppDataSource } from '@/config/dataSource';
import { AlbumDto } from '@/dto/album.dto';
import { Album } from '@/entities/album.entity';

export class AlbumRepository extends Repository<Album> {
  constructor() {
    super(Album, AppDataSource.createEntityManager());
  }

  async getAlbums(): Promise<Album[]> {
    return await this.find({ relations: { artist: true } });
  }

  async getAlbum(id: number) {
    return await this.findOne({ where: { id }, relations: { artist: true } });
  }

  async createAlbum(albumDto: AlbumDto) {
    const album = new Album();
    album.title = albumDto.title;
    album.releaseYear = albumDto.releaseYear;
    album.coverImage = albumDto.coverImage;
    album.artistId = albumDto.artistId;

    return await this.save(album);
  }
}
