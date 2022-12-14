import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className='Navigation'>
      <ul className='Navigation__list'>
        <li className='Navigation__item'>
          <Link className='Navigation__link' to={'/'}>
            Home
          </Link>
        </li>
        <li className='Navigation__item'>
          <Link className='Navigation__link' to={'/pantries'}>
            Pantries
          </Link>
        </li>
        <li className='Navigation__item'>
          <Link className='Navigation__link' to={'login'}>
            Login
          </Link>
        </li>
        <li className='Navigation__item'>
          <Link className='Navigation__link' to={'logout'}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}
