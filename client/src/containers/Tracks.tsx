import { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import { fetchTracksByAlbum } from '../features/tracksSlice';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { useSearchParams } from 'react-router-dom';
import { fetchArtists } from '@/features/artistsSlice';
import { addTrackToHistory } from '@/features/trackHistorySlice';

export function Tracks() {
  const [searchParams] = useSearchParams();
  const albumId = searchParams.get('album');
  const dispatch = useAppDispatch();
  const { tracks, loading, error } = useAppSelector((state) => state.tracks);
  const { artists } = useAppSelector((state) => state.artists);
  const { albums } = useAppSelector((state) => state.albums);
  const [maxHeight, setMaxHeight] = useState(window.innerHeight * 0.7);

  useEffect(() => {
    const updateMaxHeight = () => {
      setMaxHeight(window.innerHeight * 0.8);
    };

    window.addEventListener('resize', updateMaxHeight);
    return () => window.removeEventListener('resize', updateMaxHeight);
  }, []);

  useEffect(() => {
    if (artists.length === 0) {
      dispatch(fetchArtists());
    }
    if (albumId) {
      dispatch(fetchTracksByAlbum(parseInt(albumId)));
    }
  }, [dispatch, albumId]);

  const handleTrackClick = (trackId: number) => {
    dispatch(addTrackToHistory(trackId));
  };

  const token = localStorage.getItem('token');
  if (!token) return <Alert message="Tracks are not available to unauthorized users" type="error" showIcon />;

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;
  if (!tracks.length) return <Alert message="No tracks found" type="info" showIcon />;

  const album = albumId ? albums.find((album) => album.id === parseInt(albumId)) : undefined;
  const artist = album && artists.find((artist) => artist.id === album.artistId);

  return (
    <div>
      <h1>
        {artist ? artist.name : 'Artist Not Found'} - {album ? album.title : 'Album Not Found'}
      </h1>
      <div style={{ maxHeight, overflowY: 'auto' }}>
        {tracks.map((track) => (
          <div
            key={track.id}
            style={{ padding: '10px', border: '1px solid #ccc', borderRadius: 5, marginBottom: 5, cursor: 'pointer' }}
            onClick={() => handleTrackClick(track.id)}
          >
            <div>
              <strong>Track #{track.trackNumber}</strong>: {track.title}
            </div>
            <div><strong>Duration:</strong> {track.duration}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
