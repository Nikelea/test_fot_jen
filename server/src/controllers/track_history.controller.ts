import { RequestHandler } from 'express';
import { UserRepository } from '@/repositories/user.repository';
import { TrackHistoryService } from '@/services/track_history.service';
import { TrackHistoryDto } from '@/dto/track_history.dto';
import { plainToInstance } from 'class-transformer';

export class TrackHistoryController {
  private userService: UserRepository;
  private service: TrackHistoryService;

  constructor() {
    this.userService = new UserRepository();
    this.service = new TrackHistoryService();
  }

  createTrackHistory: RequestHandler = async (req, res): Promise<void> => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
      return;
    }
    try {
      const user = await this.userService.findOne({ where: { token } });
      if (!user) {
        res.status(401).send('Unauthorized');
        return;
      }

      const trackHistoryDto = plainToInstance(TrackHistoryDto, req.body);
      const trackHistory = await this.service.createTrackHistory(user.id, trackHistoryDto);
      res.send(trackHistory);
    } catch (e) {
      res.status(500).send(e);
    }
  };

  getTrackHistory: RequestHandler = async (req, res): Promise<void> => {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send('Unauthorized: No token provided');
      return;
    }
    try {
      const user = await this.userService.findOne({ where: { token } });
      if (!user) {
        res.status(401).send('Unauthorized');
        return;
      }

      const trackHistory = await this.service.getTrackHistory(user.id);
      const result = trackHistory.map((th) => ({
        id: th.trackId,
        trackTitle: th.track.title,
        artistName: th.track.album.artist.name,
        playedAt: th.datetime,
      }));
      res.send(result);
    } catch (e) {
      res.status(500).send(e);
    }
  };
}
