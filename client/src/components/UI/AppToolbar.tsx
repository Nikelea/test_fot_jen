import { UserContext } from '@/hooks/auth';
import { Menu, MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useContext } from 'react';
import { Logout } from '../Logout';
import { AuthModal } from '@/containers/AuthModal';
import { Link } from 'react-router-dom';

export function AppToolbar() {
  const user = useContext(UserContext);

  let items: MenuProps['items'] = [];
  if (user.token) {
    items.push(
      {
        label: <Logout />,
        key: 'logout',
      },
      {
        label: <Link to="/track-history">Track History</Link>,
        key: 'track-history',
      }
    );
  } else {
    items = items.concat([
      {
        label: <AuthModal type="register" />,
        key: 'register',
      },
      {
        label: <AuthModal type="login" />,
        key: 'login',
      },
    ]);
  }
  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <div className="demo-logo" style={{ color: 'white', fontWeight: 'bold', marginRight: 70 }}>
        My music App
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{ flex: 1, minWidth: 0 }}
        selectable={false}
      />
    </Header>
  );
}
