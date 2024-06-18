import { validate } from 'class-validator';
import { TrackHistoryRepository } from '@/repositories/track_history.repository';
import { TrackHistoryDto } from '@/dto/track_history.dto';
import { TrackHistory } from '@/entities/track_history.entity';
import { formatErrors } from '@/helpers/formatErrors';

export class TrackHistoryService {
  private repository: TrackHistoryRepository;

  constructor() {
    this.repository = new TrackHistoryRepository();
  }

  async createTrackHistory(userId: number, trackHistoryDto: TrackHistoryDto): Promise<TrackHistory> {
    const errors = await validate(trackHistoryDto, {
      whitelist: true,
      validationError: { value: false, target: false },
    });
    if (errors.length) {
      throw formatErrors(errors);
    }
    return await this.repository.createTrackHistory(userId, trackHistoryDto.track, new Date());
  }

  async getTrackHistory(userId: number): Promise<TrackHistory[]> {
    return await this.repository.find({
      where: { userId: userId },
      relations: ['track', 'track.album', 'track.album.artist'],
      order: { datetime: 'DESC' },
    });
  }
}
