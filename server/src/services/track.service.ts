import { validate } from 'class-validator';
import { formatErrors } from '@/helpers/formatErrors';
import { TrackRepository } from '@/repositories/track.repository';
import { Track } from '@/entities/track.entity';
import { TrackDto } from '@/dto/track.dto';

export class TrackService {
  private repository: TrackRepository;

  constructor() {
    this.repository = new TrackRepository();
  }

  getTracks = async (albumId?: number): Promise<Track[]> => {
    if (albumId) {
      return await this.repository.find({
        where: { albumId: albumId },
        order: { trackNumber: "ASC" },
        relations: { album: true },
      });
    } else {
      return await this.repository.getTracks();
    }
  };

  createTrack = async (data: TrackDto): Promise<Track> => {
    const errors = await validate(data, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createTrack(data);
  };

  getTracksByArtistId = async (artistId: number): Promise<Track[]> => {
    return await this.repository.createQueryBuilder("track")
      .leftJoin("track.album", "album")
      .where("album.artistId = :artistId", { artistId })
      .getMany();
  };
}
