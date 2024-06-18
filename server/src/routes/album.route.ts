import { AlbumController } from '@/controllers/album.controller';
import { IRoute } from '@/interfaces/IRoute.interface';
import { Router } from 'express';

export class AlbumRoute implements IRoute {
  public path = '/albums';
  public router = Router();
  private controller: AlbumController;

  constructor() {
    this.controller = new AlbumController();
    this.init();
  }

  private init() {
    this.router.get('/', this.controller.getAlbums);
    this.router.get('/:id', this.controller.getAlbum);
    this.router.post('/', this.controller.createAlbum);
  }
}
