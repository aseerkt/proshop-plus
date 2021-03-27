import DataLoader from 'dataloader';
import { getManager } from 'typeorm';
import { Product } from '../entities/Product';

export const createProductLoader = () =>
  new DataLoader<string, Product>(async (pdtIds) => {
    const products = await getManager()
      .createQueryBuilder(Product, 'pdt')
      .where('pdt.id IN (:...pdtIds)', { pdtIds })
      .getMany();

    const pdtIdToPdt: Record<string, Product> = {};
    products.forEach((p) => {
      pdtIdToPdt[p.id] = p;
    });

    return pdtIds.map((id) => pdtIdToPdt[id]);
  });
