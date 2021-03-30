import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import Loader from '../components/Loader';
import Layout from '../containers/Layout';
import { useMeQuery } from '../generated/graphql';
import styles from '../styles/pages/AccountPage.module.scss';
import { createUrqlClient } from '../utils/createUrqlClient';

const AccountPage = () => {
  const [{ data: userData, fetching }] = useMeQuery();

  let accountBody = null;

  if (fetching) {
    accountBody = <Loader />;
  } else if (userData && userData.me) {
    accountBody = (
      <div className={styles.accountPage}>
        <div className={styles.accountPage__gridItem}>
          <i className='fas fa-box fa-3x'></i>
          <div>
            <p>Your Orders</p>
            <small>Check the status of your orders</small>
          </div>
        </div>
        <NextLink href='/edit-account'>
          <div className={styles.accountPage__gridItem}>
            <i className='fas fa-key fa-3x'></i>
            <div>
              <p>Login &amp; Security</p>
              <small>Edit login, name and email</small>
            </div>
          </div>
        </NextLink>
        <div className={styles.accountPage__gridItem}>
          <i className='fas fa-map-marked-alt fa-3x'></i>
          <div>
            <p>Your Addresses</p>
            <small>Edit addresses for orders</small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout isPrivate title='Your account'>
      <h3 className='uppercase'>Your Account</h3>
      {accountBody}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(AccountPage);
