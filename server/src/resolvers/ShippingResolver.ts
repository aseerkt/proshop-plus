import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { ShippingAddress } from '../entities/ShippingAddress';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../MyContext';
import {
  AddShippingAddressArgs,
  AddShippingAdressResult,
} from '../typeDefs/shippingTypes';
import { extractErrors } from '../utils/extractErrors';

@Resolver()
export class ShippingResolver {
  @Query(() => [ShippingAddress])
  @UseMiddleware(isAuth)
  getMyShippingAddresses(@Ctx() { res }: MyContext) {
    return ShippingAddress.find({ where: { userId: res.locals.userId } });
  }

  @Mutation(() => AddShippingAdressResult)
  @UseMiddleware(isAuth)
  async addShippingAddress(
    @Arg('addShippingArgs')
    addShippingArgs: AddShippingAddressArgs,
    @Ctx() { res }: MyContext
  ): Promise<AddShippingAdressResult> {
    const shippingAddress = ShippingAddress.create({
      ...addShippingArgs,
      userId: res.locals.userId,
    });
    const { errors } = await extractErrors(shippingAddress);
    if (errors) return { errors };
    await shippingAddress.save();
    return { shippingAddress };
  }
}
