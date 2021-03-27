import { validate } from 'class-validator';
import { FieldError } from '../typeDefs/globalTypes';

export const extractErrors = async (
  entity: Object
): Promise<{ errors: FieldError[] | null }> => {
  const validationErrors = await validate(entity);
  if (validationErrors.length > 0) {
    // console.log(validationErrors);
    const errors = validationErrors.map(({ property, constraints }) => ({
      path: property,
      message: Object.values(constraints!)[0],
    }));
    return { errors };
  }
  return { errors: null };
};
