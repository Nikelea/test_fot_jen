import { List, Card, Spin, Alert } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchAlbumsByArtist } from '../features/albumsSlice';
import { Album } from '../features/albumsSlice';

export function Albums() {
  const [searchParams] = useSearchParams();
  const artistId = searchParams.get('artist');
  const dispatch = useAppDispatch();
  const { albums, loading, error } = useAppSelector((state) => state.albums);
  const { artists } = useAppSelector((state) => state.artists);

  useEffect(() => {
    if (artistId) {
      dispatch(fetchAlbumsByArtist(parseInt(artistId)));
    }
  }, [dispatch, artistId]);

  const artistName = artistId
    ? artists.find((artist) => artist.id === parseInt(artistId))?.name
    : undefined;

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;
  if (!albums.length)
    return (
      <Alert
        message={
          <div>
            <h1>{artistName}</h1>
          </div>
        }
        description="No albums found for this artist."
        type="info"
      />
    );

  return (
    <div>
      {artistName && <h1>{artistName}</h1>}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={albums}
        renderItem={(album: Album) => (
          <List.Item>
            <Link to={`/tracks?album=${album.id}`}>
              <Card
                hoverable
                cover={
                  <img
                    alt={album.title}
                    src={album.coverImage}
                    style={{ height: '250px', objectFit: 'cover', width: '100%' }}
                  />
                }
              >
                <Card.Meta title={album.title} description={String(album.releaseYear)} />
              </Card>
            </Link>
          </List.Item>
        )}
        style={{ height: 'calc(100vh - 20px - 48px * 2)', overflow: 'auto' }}
      />
    </div>
  );
}
