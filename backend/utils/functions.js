import { v4 as uuid } from 'uuid';

export const generateSKU = () => {
  const id = uuid();
  return id.substring(id.length - 10).toUpperCase();
};
