import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { ArtistService } from '@/services/artist.service';
import { ArtistDto } from '@/dto/artist.dto';
import { IArtist } from '@/interfaces/IArtist.interface';

export class ArtistController {
  private service: ArtistService;

  constructor() {
    this.service = new ArtistService();
  }

  getArtists: RequestHandler = async (_, res): Promise<void> => {
    const artists: IArtist[] = await this.service.getArtists();
    res.send(artists);
  };

  createArtist: RequestHandler = async (req, res): Promise<void> => {
    try {
      const artistDto = plainToInstance(ArtistDto, req.body);
      const artist: IArtist = await this.service.createArtist(artistDto);
      res.send(artist);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(e);
      } else {
        res.status(500).send(e);
      }
    }
  };
}
