import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { AppToolbar } from './components/UI/AppToolbar';
import { Artists } from './containers/Artists';
import { Albums } from './containers/Albums';
import { Tracks } from './containers/Tracks';
import { TrackHistory } from './containers/TrackHistory';

const { Content } = Layout;

const layoutStyle = {
  height: '100vh',
  overflow: 'hidden',
  width: '100%',
};

function App() {
  return (
    <Layout style={layoutStyle}>
      <AppToolbar />
      <Content style={{ padding: '0 48px', marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<Artists />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/tracks" element={<Tracks />} />
          <Route path="/track-history" element={<TrackHistory />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
