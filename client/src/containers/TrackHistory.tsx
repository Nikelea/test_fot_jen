import { useEffect } from 'react';
import { Spin, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../store/hook';
import { fetchTrackHistory } from '../features/trackHistorySlice';

export function TrackHistory() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const history = useAppSelector((state) => state.trackHistory.history);
  const loading = useAppSelector((state) => state.trackHistory.loading);
  const error = useAppSelector((state) => state.trackHistory.error);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchTrackHistory());
    }
  }, [dispatch, token, navigate]);

  if (loading) return <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: '25%' }} />;
  if (error) return <div>Error: {error}</div>;

  const columns = [
    { title: 'Artist', dataIndex: 'artistName', key: 'artistName' },
    { title: 'Track', dataIndex: 'trackTitle', key: 'trackTitle' },
    {
      title: 'Played At',
      dataIndex: 'playedAt',
      key: 'playedAt',
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
  ];

  return (
    <Table dataSource={history.map((item, index) => ({ ...item, key: index }))} columns={columns} />
  );
}
