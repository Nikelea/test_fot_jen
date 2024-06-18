import { Router } from 'express';
import { IRoute } from '@/interfaces/IRoute.interface';
import { TrackController } from '@/controllers/track.controller';

export class TrackRoute implements IRoute {
  public path = '/tracks';
  public router = Router();
  private controller: TrackController;

  constructor() {
    this.controller = new TrackController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getTracks);
    this.router.post('/', this.controller.createTrack);
    this.router.get('/:artistId', this.controller.getTracksByArtistId);
  }
}
