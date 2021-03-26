import Head from 'next/head';
import styles from '../styles/pages/Home.module.scss';
import ProductCard from '../components/ProductCard';
import { createUrqlClient } from '../utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import { Product, useGetProductsQuery } from '../generated/graphql';
import Layout from '../containers/Layout';

const Home = () => {
  const [{ data, fetching }] = useGetProductsQuery();

  if (fetching) return <h1>Oops</h1>;

  const products = data && data.getProducts;
  return (
    <Layout>
      <Head>
        <title>ProShop+ | Fill up your cart</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <h3 className={styles.home__sectionTitle}>Latest Products</h3>
      <div className={styles.home__productList}>
        {products &&
          products.map((p) => (
            <ProductCard key={p.id} product={p as Product} />
          ))}
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Home);
