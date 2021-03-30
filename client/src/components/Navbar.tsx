import NextLink from 'next/link';
import styles from '../styles/components/Navbar.module.scss';
import {
  useGetMyCartQuery,
  useMeQuery,
  useLogoutMutation,
} from '../generated/graphql';
import NavDropdown from './NavDropdown';

const Navbar = () => {
  const [{ data: userData, fetching }] = useMeQuery();
  const [{ data }] = useGetMyCartQuery();
  const [, logout] = useLogoutMutation();
  const user = userData?.me || null;

  const cartTag = data?.getMyCart.length || 0;
  return (
    <header className={styles.navbar}>
      <div className='container flex items-center justify-between'>
        <NextLink href='/'>
          <a className={styles.navbar__title}>ProShop+</a>
        </NextLink>
        <nav>
          <ul>
            <li className={styles.navbar__links}>
              <NextLink href='/cart'>
                <a className='btn btn-outlined'>
                  {cartTag !== 0 && (
                    <div className={styles.navbar__cartCount}> {cartTag}</div>
                  )}
                  <i className='fas fa-shopping-cart'></i> <span>Cart</span>
                </a>
              </NextLink>
            </li>
            <li className={styles.navbar__links}>
              {fetching ? null : user ? (
                <NavDropdown title={user.name}>
                  <ul>
                    <li>
                      <NextLink href='/account'>
                        <a>
                          {' '}
                          <i className='fas fa-user'></i> Account
                        </a>
                      </NextLink>
                    </li>
                    <li onClick={() => logout()}>
                      <a>
                        {' '}
                        <i className='fas fa-sign-out-alt'></i> Log out
                      </a>
                    </li>
                  </ul>
                </NavDropdown>
              ) : (
                <NextLink href='/login'>
                  <a className='btn btn-outlined'>
                    <i className='fas fa-user'></i> <span>Sign In</span>
                  </a>
                </NextLink>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
