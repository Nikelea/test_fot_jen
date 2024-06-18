import { validate } from 'class-validator';
import { ArtistDto } from '@/dto/artist.dto';
import { IArtist } from '@/interfaces/IArtist.interface';
import { ArtistRepository } from '@/repositories/artist.repository';
import { formatErrors } from '@/helpers/formatErrors';

export class ArtistService {
  private repository: ArtistRepository;

  constructor() {
    this.repository = new ArtistRepository();
  }

  async getArtists(): Promise<IArtist[]> {
    return await this.repository.getArtists();
  }

  async createArtist(data: ArtistDto): Promise<IArtist> {
    const errors = await validate(data, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createArtist(data);
  }
}
