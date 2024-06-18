import { Router } from 'express';
import { ArtistController } from '@/controllers/artist.controller';
import { IRoute } from '@/interfaces/IRoute.interface';

export class ArtistRoute implements IRoute {
  public path = '/artists';
  public router = Router();
  private controller: ArtistController;

  constructor() {
    this.controller = new ArtistController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getArtists);
    this.router.post('/', this.controller.createArtist);
  }
}
