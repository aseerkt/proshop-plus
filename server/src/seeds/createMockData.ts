import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { Product } from '../entities/Product';
import { User } from '../entities/User';
import products from './products.json';
import userData from './users.json';

export default class CreateMockData implements Seeder {
  public async run(_: any, connection: Connection): Promise<any> {
    await connection.dropDatabase();
    await connection.synchronize();

    const users = await User.save(
      userData.map((u) => User.create({ ...u, password: '123456' }))
    );

    const admin = users.filter((u) => u.isAdmin)[0];

    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(products.map((p) => Product.create({ ...p, userId: admin.id })))
      .execute();
  }
}
