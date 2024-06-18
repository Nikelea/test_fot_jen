import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { ArtistRoute } from './routes/artist.route';
import { AlbumRoute } from './routes/album.route';
import { TrackRoute } from './routes/track.route';
import { AuthRoute } from './routes/auth.route';
import { TrackHistoryRoute } from './routes/track_history.route';

const app = new App({
  port: 8000,
  middlewares: [logger(), cors({
    exposedHeaders: 'Authorization',
  })],
  controllers: [
    new ArtistRoute(), 
    new AlbumRoute(), 
    new TrackRoute(),
    new AuthRoute(),
    new TrackHistoryRoute()
  ],
});

app.listen();
