import {
  Arg,
  Ctx,
  FieldResolver,
  ID,
  Int,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Cart } from '../entities/Cart';
import { CartItem } from '../entities/CartItem';
import { Product } from '../entities/Product';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../MyContext';

@Resolver(CartItem)
export class CartItemResolver {
  @FieldResolver(() => Product)
  async product(@Root() carItem: CartItem, @Ctx() { pdtLoader }: MyContext) {
    return pdtLoader.load(carItem.productId);
  }

  @Mutation(() => Int, { nullable: true })
  @UseMiddleware(isAuth)
  async changeItemQty(
    @Arg('cartItemId', () => ID) cartItemId: string,
    @Arg('qty', () => Int) qty: number,
    @Ctx() { res }: MyContext
  ): Promise<number | null> {
    const cart = await Cart.findOne({ where: { userId: res.locals.userId } });
    if (!cart) return null;
    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, id: cartItemId },
      relations: ['product'],
    });
    if (!cartItem) return null;
    if (cartItem.qty === qty) return null;
    if (qty > cartItem.product.countInStock) return null;
    console.log('made it here', qty);
    cartItem.qty = qty;
    await cartItem.save();
    return cartItem.qty;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteCartItem(
    @Arg('cartItemId', () => ID) cartItemId: string,
    @Ctx() { res }: MyContext
  ): Promise<boolean> {
    const cart = await Cart.findOne({ where: { userId: res.locals.userId } });
    if (!cart) return false;
    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, id: cartItemId },
    });
    if (!cartItem) return false;
    await cartItem.remove();
    return true;
  }
}
