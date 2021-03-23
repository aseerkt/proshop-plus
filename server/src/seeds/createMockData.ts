import { Connection } from 'typeorm';
import { Seeder } from 'typeorm-seeding';
import { Product } from '../entities/Product';
import products from './products.json';

export default class CreateMockData implements Seeder {
  public async run(_: any, connection: Connection): Promise<any> {
    await connection.dropDatabase();
    await connection.synchronize();

    await connection
      .createQueryBuilder()
      .insert()
      .into(Product)
      .values(products.map((p) => Product.create(p)))
      .execute();
  }
}
