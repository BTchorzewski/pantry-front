import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { protectedBasicRoute } from '../../utils/fetch';
import { clearToken } from '../../utils/token-session-storage';

export function Navigation() {
  const [user, setUser] = useAuth();
  const logout = async () => {
    try {
      await protectedBasicRoute.get('/auth/logout');
    } catch (e) {
      console.error(e);
    } finally {
      clearToken();
      setUser(null);
    }
  };
  return (
    <nav className='Navigation'>
      <ul className='Navigation__list'>
        <li className='Navigation__item'>
          <Link className='Navigation__link' to={'/'}>
            Home
          </Link>
        </li>
        {!user ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'/pantries'}>
              Pantries
            </Link>
          </li>
        )}
        {user ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'login'}>
              Login
            </Link>
          </li>
        )}
        {!user ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'logout'} onClick={logout}>
              Logout
            </Link>
          </li>
        )}
        {user ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'registration'}>
              Registration
            </Link>
          </li>
        )}
      </ul>
      {user ? null : <p className='Avatar'>Witaj! {user}</p>}
    </nav>
  );
}
