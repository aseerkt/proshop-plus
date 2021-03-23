import '../styles/globals.scss';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: '20px' }}>
        <div className='container'>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
