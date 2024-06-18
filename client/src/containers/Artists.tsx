import { List, Card, Spin, Alert } from 'antd';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchArtists } from '../features/artistsSlice';

export function Artists() {
  const dispatch = useAppDispatch();
  const { artists, loading, error } = useAppSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (loading) return <Spin />;
  if (error) return <Alert message="Error" description={error} type="error" showIcon />;

  return (
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
      dataSource={artists}
      renderItem={(artist) => (
        <List.Item>
          <Link to={`/albums?artist=${artist.id}`}>
            <Card
              hoverable
              cover={
                <img
                  alt={artist.name}
                  src={artist.photo}
                  style={{ height: '250px', objectFit: 'cover', width: '100%' }}
                />
              }
            >
              <Card.Meta title={artist.name} />
            </Card>
          </Link>
        </List.Item>
      )}
      style={{ height: 'calc(100vh - 20px - 48px * 2)', overflow: 'auto' }}
    />
  );
}
