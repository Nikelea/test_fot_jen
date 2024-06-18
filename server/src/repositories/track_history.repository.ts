import { Repository } from 'typeorm';
import { AppDataSource } from '@/config/dataSource';
import { TrackHistory } from '@/entities/track_history.entity';

export class TrackHistoryRepository extends Repository<TrackHistory> {
  constructor() {
    super(TrackHistory, AppDataSource.createEntityManager());
  }

  async createTrackHistory(userId: number, trackId: number, datetime: Date) {
    const trackHistory = new TrackHistory();
    trackHistory.userId = userId;
    trackHistory.trackId = trackId;
    trackHistory.datetime = datetime;
    await this.save(trackHistory);

    return trackHistory;
  }
}
