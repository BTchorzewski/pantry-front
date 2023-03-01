import { Link } from 'react-router-dom';
import { authSelector, logout } from '../../redux/authSlice/authSlice';
import { useDispatch, useSelector } from 'react-redux';
export function Navigation() {
  const dispatch = useDispatch();
  const {
    auth: { isAuth, user },
  } = useSelector(authSelector);
  return (
    <nav className='Navigation'>
      <ul className='Navigation__list'>
        <li className='Navigation__item'>
          <Link className='Navigation__link' to={'/'}>
            Home
          </Link>
        </li>
        {!isAuth ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'/pantriesSlice'}>
              Pantries
            </Link>
          </li>
        )}
        {isAuth ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'login'}>
              Login
            </Link>
          </li>
        )}
        {!isAuth ? null : (
          <li className='Navigation__item'>
            <Link
              className='Navigation__link'
              to={'logout'}
              onClick={async (event) => {
                // @ts-ignore
                dispatch(logout());
              }}
            >
              Logout
            </Link>
          </li>
        )}
        {isAuth ? null : (
          <li className='Navigation__item'>
            <Link className='Navigation__link' to={'registration'}>
              Registration
            </Link>
          </li>
        )}
      </ul>
      {!isAuth ? null : <p className='Avatar'>Witaj! {user}</p>}
    </nav>
  );
}
