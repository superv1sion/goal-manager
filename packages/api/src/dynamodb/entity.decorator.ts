import { getDatabaseMetadataStorage } from './database-metadata-storage';

export interface EntityOptions {
  tableName: string;
}

export function Entity(options: EntityOptions): ClassDecorator {
  return function (entity: Function) {
    getDatabaseMetadataStorage().entities.push({ entity, options });
  };
}
