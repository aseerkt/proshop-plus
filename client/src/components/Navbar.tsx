import NextLink from 'next/link';
import styles from '../styles/components/Navbar.module.scss';

const Navbar = () => {
  return (
    <header className={styles.navbar}>
      <div className='container flex items-center justify-between'>
        <NextLink href='/'>
          <a className={styles.navbar__title}>ProShop+</a>
        </NextLink>
        <nav>
          <ul>
            <li className={styles.navbar__links}>
              <NextLink href='/'>
                <a className='btn'>
                  <i className='fas fa-shopping-cart'></i> Cart
                </a>
              </NextLink>
            </li>
            <li className={styles.navbar__links}>
              <NextLink href='/'>
                <a className='btn'>
                  <i className='fas fa-user'></i> Sign In
                </a>
              </NextLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
