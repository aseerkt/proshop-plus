import Head from 'next/head';
import { useRouter } from 'next/router';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Navbar from '../components/Navbar';
import { useMeQuery } from '../generated/graphql';
import { isServerSide } from '../utils/isServerSide';
import { useMsgStore } from '../zustand/useMsgStore';

interface LayoutProps {
  isPrivate?: boolean;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({
  title,
  isPrivate = false,
  children,
}) => {
  const router = useRouter();
  const alert = useMsgStore((state) => state.alert);
  const [{ data, fetching }] = useMeQuery({
    pause: !isPrivate || isServerSide(),
  });

  let layoutBody = null;
  if (!isPrivate || (!fetching && data && data.me)) {
    layoutBody = children;
  } else {
    if (fetching) {
      layoutBody = <Loader />;
    }

    if ((!fetching && !data) || (!fetching && data && !data.me)) {
      typeof window !== 'undefined' && router.replace('/');
      alert('You need to login to get access to private resources', 'error');
    }
  }

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar />
      <main style={{ marginTop: '0.5rem' }}>
        <div className='container'>
          <Message />
          {layoutBody}
        </div>
      </main>
    </>
  );
};

export default Layout;
