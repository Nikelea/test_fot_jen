import { validate } from 'class-validator';
import { Album } from '@/entities/album.entity';
import { formatErrors } from '@/helpers/formatErrors';
import { AlbumRepository } from '@/repositories/album.repository';
import { AlbumDto } from '@/dto/album.dto';

export class AlbumService {
  private repository: AlbumRepository;

  constructor() {
    this.repository = new AlbumRepository();
  }

  getAlbums = async (artistId?: number): Promise<Album[]> => {
    if (artistId) {
      return await this.repository.find({
        where: { artistId: artistId },
        order: { releaseYear: "ASC" },
        relations: { artist: true },
      });
    } else {
      return await this.repository.getAlbums();
    }
  };

  getAlbum = async (id: number): Promise<Album> => {
    const album = await this.repository.getAlbum(id);
    if (!album) {
      throw new Error('Invalid id');
    }
    return album;
  };

  createAlbum = async (data: AlbumDto): Promise<Album> => {
    const errors = await validate(data, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createAlbum(data);
  };
}
