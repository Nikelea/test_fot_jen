import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { AlbumService } from '@/services/album.service';
import { AlbumDto } from '@/dto/album.dto';

export class AlbumController {
  private service: AlbumService;

  constructor() {
    this.service = new AlbumService();
  }

  getAlbums: RequestHandler = async (req, res): Promise<void> => {
    try {
      const artistId = req.query.artist ? parseInt(req.query.artist as string, 10) : undefined;
      const albums = await this.service.getAlbums(artistId);
      res.send(albums);
    } catch (e) {
      res.status(500).send({ message: 'Internal server error', detailedMessage: (e as Error)?.message });
    }
  };

  getAlbum: RequestHandler = async (req, res): Promise<void> => {
    try {
      const album = await this.service.getAlbum(parseInt(req.params.id, 10));
      res.send(album);
    } catch (e) {
      res.status(404).send({ message: 'Album not found', detailedMessage: (e as Error)?.message });
    }
  };

  createAlbum: RequestHandler = async (req, res): Promise<void> => {
    try {
      const albumDto = plainToInstance(AlbumDto, req.body);
      const album = await this.service.createAlbum(albumDto);
      res.send(album);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(e);
      } else {
        res.status(500).send(e);
      }
    }
  };
}
