import { AttributeDefinition } from './attribute.decorator';
import { EntityOptions } from './entity.decorator';

export interface RepositoryMetadata {
  repository: Function;
  entity: Function;
  domainObject?: Function;
  mapDomainObjectToEntity?: Function;
  mapEntityToDomainObject?: Function;
}

export interface EntityMetadata {
  entity: Function;
  options: EntityOptions;
}

export interface AttributeMetadata {
  entity: Function;
  propertyName: string | symbol;
  definition: AttributeDefinition;
}

class DatabaseMetadataStorage {
  public readonly repositories: RepositoryMetadata[] = [];
  public readonly entities: EntityMetadata[] = [];
  public readonly attributes: AttributeMetadata[] = [];

  public getEntityAttributesMetadata(
    EntityConstructor: Function,
  ): Map<string | symbol, AttributeDefinition> {
    const attributes: Map<string | symbol, AttributeDefinition> = new Map<
      string,
      AttributeDefinition
    >();

    this.attributes
      .filter(
        (attribute: AttributeMetadata) =>
          attribute.entity === EntityConstructor,
      )
      .forEach((attribute: AttributeMetadata) => {
        attributes.set(attribute.propertyName, attribute.definition);
      });

    return attributes;
  }

  public getEntityAttributeDefinition(
    EntityConstructor: Function,
    attributeName: string | symbol,
  ): AttributeDefinition | undefined {
    const attributesMetadata: Map<string | symbol, AttributeDefinition> =
      this.getEntityAttributesMetadata(EntityConstructor);
    return attributesMetadata.get(attributeName);
  }

  public getEntityMetadata(entityConstructor: Function): EntityMetadata {
    const metadata: EntityMetadata | undefined = this.entities.find(
      (metadata: EntityMetadata) => metadata.entity === entityConstructor,
    );

    if (metadata === undefined) {
      throw new Error(`Entity ${entityConstructor.name} does not exist`);
    }

    return metadata;
  }

  public getRepositoryMetadata(
    repositoryConstructor: Function,
  ): RepositoryMetadata {
    const metadata: RepositoryMetadata | undefined = this.repositories.find(
      (metadata: RepositoryMetadata) =>
        metadata.repository === repositoryConstructor,
    );

    if (metadata === undefined) {
      throw new Error(
        `Repository ${repositoryConstructor.name} does not exist`,
      );
    }

    return metadata;
  }
}

const storage: DatabaseMetadataStorage = new DatabaseMetadataStorage();

export function getDatabaseMetadataStorage(): DatabaseMetadataStorage {
  return storage;
}
