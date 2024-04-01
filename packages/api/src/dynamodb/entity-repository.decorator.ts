import { getDatabaseMetadataStorage } from './database-metadata-storage';

export function EntityRepository(
  entity: Function,
  domainObject?: Function,
  mapDomainObjectToEntity?: Function,
  mapEntityToDomainObject?: Function,
): ClassDecorator {
  return function (repository: Function) {
    getDatabaseMetadataStorage().repositories.push({
      repository,
      entity,
      domainObject,
      mapDomainObjectToEntity,
      mapEntityToDomainObject,
    });
  };
}
