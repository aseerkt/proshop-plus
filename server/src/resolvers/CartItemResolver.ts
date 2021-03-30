import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  ID,
  InputType,
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

@InputType()
class GuestItem {
  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  qty: number;
}

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

  @Mutation(() => [CartItem])
  @UseMiddleware(isAuth)
  async addGuestItemsToCart(
    @Arg('guestItems', () => [GuestItem]) guestItems: GuestItem[],
    @Ctx() { res }: MyContext
  ): Promise<CartItem[] | null> {
    const myCart = await Cart.findOne({ where: { userId: res.locals.userId } });
    if (!myCart) {
      const newCart = await Cart.create({ userId: res.locals.userId }).save();
      const newItems = await CartItem.save(
        guestItems.map(({ productId, qty }) =>
          CartItem.create({ productId, qty, cartId: newCart.id })
        )
      );
      return newItems;
    } else {
      const cartItems = await CartItem.find({
        where: { cartId: myCart.id },
      });
      let newOrUpdatedCartItems: CartItem[] = [];
      guestItems.forEach(async ({ productId, qty }) => {
        const existIndex = cartItems.findIndex(
          (i) => i.productId === productId
        );
        if (existIndex === -1) {
          const newItem = await CartItem.create({
            cartId: myCart.id,
            qty,
            productId,
          }).save();
          newOrUpdatedCartItems.push(newItem);
        } else {
          const updItem = cartItems[existIndex];
          if (updItem.qty !== qty) {
            updItem.qty = qty;
            await updItem.save();
            newOrUpdatedCartItems.push(updItem);
          }
        }
      });
      return newOrUpdatedCartItems;
    }
  }
}
