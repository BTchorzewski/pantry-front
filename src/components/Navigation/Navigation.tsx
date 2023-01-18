import { Link } from 'react-router-dom';
import { useToken } from '../../hooks/useToken';
import { protectedBasicRoute } from '../../utils/fetch';

export function Navigation() {
  const [token, setToken] = useToken();
  const logout = async () => {
    try {
      await protectedBasicRoute.get('/auth/logout');
    } catch (e) {
      console.error(e);
    } finally {
      setToken(null);
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
        {!token ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'/pantries'}>
              Pantries
            </Link>
          </li>
        )}
        {token ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'login'}>
              Login
            </Link>
          </li>
        )}
        {!token ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'logout'} onClick={logout}>
              Logout
            </Link>
          </li>
        )}
        {token ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'registration'}>
              Registration
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
