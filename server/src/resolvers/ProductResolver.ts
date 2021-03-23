import { Arg, FieldResolver, ID, Query, Resolver, Root } from 'type-graphql';
import { APP_URL } from '../constants';
import { Product } from '../entities/Product';

@Resolver(Product)
export class ProductResolver {
  @FieldResolver(() => String)
  image(@Root() product: Product) {
    return product.image.startsWith('/images')
      ? `${APP_URL}${product.image}`
      : product.image;
  }

  @Query(() => [Product])
  getProducts(): Promise<Product[]> {
    return Product.find({ order: { createdAt: 'DESC' } });
  }

  @Query(() => Product, { nullable: true })
  getProduct(
    @Arg('productId', () => ID) productId: string
  ): Promise<Product | undefined> {
    return Product.findOne(productId);
  }
}
