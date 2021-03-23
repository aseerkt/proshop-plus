import Head from 'next/head';
import styles from '../styles/pages/Home.module.scss';
import ProductCard from '../components/ProductCard';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { Product, useGetProductsQuery } from '../generated/graphql';

const Home = () => {
  const [{ data, fetching }] = useGetProductsQuery();

  if (fetching) return <h1>Oops</h1>;

  const products: Product[] = data && data.getProducts;
  return (
    <div className=''>
      <Head>
        <title>ProShop+</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h3 className={styles.home__sectionTitle}>Latest Products</h3>
      <div className={styles.home__productList}>
        {products &&
          products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
