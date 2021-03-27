import DataLoader from 'dataloader';
import { getManager } from 'typeorm';
import { User } from '../entities/User';

export const createUserLoader = () =>
  new DataLoader<string, User>(async (userIds) => {
    const users = await getManager()
      .createQueryBuilder(User, 'pdt')
      .where('pdt.id IN (:...userIds)', { userIds })
      .getMany();

    const userIdToUser: Record<string, User> = {};
    users.forEach((u) => {
      userIdToUser[u.id] = u;
    });

    return userIds.map((id) => userIdToUser[id]);
  });
