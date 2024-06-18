import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/hooks/auth';

export function Logout() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  const onClick = () => {
    localStorage.removeItem('token');
    user.setToken('');
    navigate('/');
  };

  return <a onClick={onClick}>Logout</a>;
}
