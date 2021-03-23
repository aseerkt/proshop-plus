import { withUrqlClient } from 'next-urql';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Rating from '../../components/Rating';
import { useGetProductQuery } from '../../generated/graphql';
import styles from '../../styles/pages/ProductPage.module.scss';
import { createUrqlClient } from '../../utils/createUrqlClient';

const ProductPage = () => {
  const { query } = useRouter();
  const { productId }: any = query;

  const [{ data, fetching }] = useGetProductQuery({
    variables: { productId },
    pause: typeof productId !== 'string',
  });

  const product = data && data.getProduct;

  if (fetching) return <h2>Oops</h2>;
  if (!product) return <h2>No product</h2>;
  return (
    <>
      <NextLink href='/'>
        <a className='btn btn-filled'>Go back</a>
      </NextLink>
      <div className={styles.productPage__container}>
        <Image
          src={product.image}
          alt={product.name}
          height='100%'
          layout='responsive'
          objectFit='contain'
          width='100%'
        />
        <div className={styles.productPage__details}>
          <h2>{product.name}</h2>
          <Rating rating={product.rating} />
          <p>{product.numReviews} reviews</p>
          <p className={styles.productPage__price}>
            <span>Price:</span>
            <strong>
              {'  '}${product.price}
            </strong>
          </p>
          <p>
            <span>Description:</span>
            <span>
              {'  '}
              {product.description}
            </span>
          </p>
        </div>
        <div className={styles.productPage__cart}>
          <div className={styles.productPage__card}>
            <div className={styles.productPage__cart__grid}>
              <strong>Price:</strong>
              <span>${product.price}</span>
              <strong>Status:</strong>
              <span>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <button
              className='btn btn-filled'
              disabled={product.countInStock < 1}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(ProductPage);
