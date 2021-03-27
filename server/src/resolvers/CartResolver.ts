import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../MyContext';

@Resolver(Cart)
export class CartResolver {
  @FieldResolver(() => [CartItem])
  cartItems(@Root() cart: Cart) {
    return CartItem.find({ where: { cartId: cart.id } });
  }

  @Query(() => Cart, { nullable: true })
  @UseMiddleware(isAuth)
  getMyCart(@Ctx() { res }: MyContext) {
    return Cart.findOne({ where: { userId: res.locals.userId } });
  }

  @Mutation(() => CartItem, { nullable: true })
  @UseMiddleware(isAuth)
  async addToCart(
    @Arg('productId', () => ID) productId: string,
    @Arg('qty', () => Int) qty: number,
    @Ctx() { pdtLoader, res }: MyContext
  ) {
    const product = await pdtLoader.load(productId);
    if (!product) return null;
    const existCart = await Cart.findOne({
      where: { userId: res.locals.userId },
    });
    if (!existCart) {
      const newCart = await Cart.create({ userId: res.locals.userId }).save();
      const newCartItem = await CartItem.create({
        cartId: newCart.id,
        productId: product.id,
        qty,
      }).save();
      return newCartItem;
    } else {
      const cartItems = await CartItem.find({
        where: { cartId: existCart.id },
      });
      const existItem = cartItems.find((item) => item.productId === product.id);
      if (!existItem || cartItems.length === 0) {
        const newCartItem = await CartItem.create({
          cartId: existCart.id,
          productId: product.id,
          qty,
        }).save();
        return newCartItem;
      }
      if (existItem.qty === qty) return existItem;
      existItem.qty = qty;
      await existItem.save();
      return existItem;
    }
  }
}
