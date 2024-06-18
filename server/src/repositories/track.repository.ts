import { Repository } from 'typeorm';
import { AppDataSource } from '@/config/dataSource';
import { Track } from '@/entities/track.entity';
import { TrackDto } from '@/dto/track.dto';

export class TrackRepository extends Repository<Track> {
  constructor() {
    super(Track, AppDataSource.createEntityManager());
  }

  async getTracks(): Promise<Track[]> {
    return await this.find({ relations: { album: true } });
  }

  async createTrack(trackDto: TrackDto) {
    const track = new Track();
    track.trackNumber = trackDto.trackNumber;
    track.title = trackDto.title;
    track.duration = trackDto.duration;
    track.albumId = trackDto.albumId;

    return await this.save(track);
  }
}
