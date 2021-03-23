import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Rating from '../../components/Rating';
import products from '../../products.json';
import styles from '../../styles/pages/ProductPage.module.scss';

const ProductPage = () => {
  const { query } = useRouter();
  const { productId } = query;

  const product = products.find((p) => p._id === productId);

  if (!product) return null;
  return (
    <>
      <NextLink href='/'>
        <a className='btn btn-filled'>Go back</a>
      </NextLink>
      <div className={styles.productPage__container}>
        <Image
          src={`http://localhost:5000${product.image}`}
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

export default ProductPage;
