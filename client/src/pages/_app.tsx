import '../styles/globals.scss';
import Navbar from '../components/Navbar';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
