import Head from 'next/head';
import products from '../products.json';
import styles from '../styles/pages/Home.module.scss';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <div className=''>
      <Head>
        <title>ProShop+</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h3 className={styles.home__sectionTitle}>Latest Products</h3>
      <div className={styles.home__productList}>
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
    </div>
  );
}
