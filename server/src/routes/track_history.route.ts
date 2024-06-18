import { Router } from 'express';
import { TrackHistoryController } from '@/controllers/track_history.controller';
import { IRoute } from '@/interfaces/IRoute.interface';

export class TrackHistoryRoute implements IRoute {
  public path = '/track_history';
  public router = Router();
  private controller: TrackHistoryController;

  constructor() {
    this.controller = new TrackHistoryController();
    this.init();
  }

  private init() {
    this.router.post('/', this.controller.createTrackHistory);
    this.router.get('/', this.controller.getTrackHistory);
  }
}
