import NextLink from 'next/link';
import Image from 'next/image';
import { Product } from '../product';
import styles from '../styles/components/Product.module.scss';
import Rating from './Rating';

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className={styles.product}>
      <NextLink href={`/product/${product._id}`}>
        <a>
          <div className={styles.product__image}>
            <Image
              src={`http://localhost:5000${product.image}`}
              alt={product.name}
              layout='fill'
              objectFit='cover'
            />
          </div>
        </a>
      </NextLink>
      <div className={styles.product__details}>
        <p className={styles.product__title}>{product.name}</p>
        <div>
          <Rating rating={product.rating} />
          <small>{product.numReviews} reviews </small>
          <h3 className={styles.product__price}>${product.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
