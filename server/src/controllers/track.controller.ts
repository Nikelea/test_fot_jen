import { RequestHandler } from 'express';
import { plainToInstance } from 'class-transformer';
import { TrackService } from '@/services/track.service';
import { TrackDto } from '@/dto/track.dto';

export class TrackController {
  private service: TrackService;

  constructor() {
    this.service = new TrackService();
  }

  getTracks: RequestHandler = async (req, res): Promise<void> => {
    try {
      const albumId = req.query.album ? parseInt(req.query.album as string, 10) : undefined;
      const tracks = await this.service.getTracks(albumId);
      res.send(tracks);
    } catch (e) {
      res.status(500).send({ message: 'Internal server error', detailedMessage: (e as Error)?.message });
    }
  };

  createTrack: RequestHandler = async (req, res): Promise<void> => {
    try {
      const trackDto = plainToInstance(TrackDto, req.body);
      const track = await this.service.createTrack(trackDto);
      res.send(track);
    } catch (e) {
      if (Array.isArray(e)) {
        res.status(400).send(e);
      } else {
        res.status(500).send(e);
      }
    }
  };

  getTracksByArtistId: RequestHandler = async (req, res): Promise<void> => {
    try {
      const artistId = parseInt(req.params.artistId, 10);
      const tracks = await this.service.getTracksByArtistId(artistId);
      res.send(tracks);
    } catch (e) {
      res.status(500).send({ message: 'Internal server error', detailedMessage: (e as Error)?.message });
    }
  };
}
