import { initializeDynamoDB } from './initialize-dynamodb';
import AsyncLock from 'async-lock';
import { model } from 'dynamoose';
import { ModelType, ObjectType } from 'dynamoose/dist/General';
import { Item } from 'dynamoose/dist/Task';
import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { AttributeDefinition } from './attribute.decorator';
import {
  EntityMetadata,
  getDatabaseMetadataStorage,
  RepositoryMetadata,
} from './database-metadata-storage';
import { isNotNilOrEmpty } from 'ramda-adjunct';

const INIT_LOCK_NAME = 'init-lock-name';

initializeDynamoDB();

export interface SchemaSettings {
  saveUnknown?: string[];
  timestamps?: { updatedAt: string };
}

export type KeyObject = Record<string, string | number>;

export type InputKey = string | number | KeyObject;

type BatchOperation = (items: ObjectType[]) => Promise<{
  unprocessedItems: ObjectType[];
}>;

export abstract class BaseRepository<Entity> {
  public schemaDefinition: SchemaDefinition;
  public tableName: string;

  protected readonly metadata: RepositoryMetadata;
  protected model: ModelType<Item>;

  private readonly defaultBatchRetryCount: number = 8;

  public constructor() {
    this.metadata = this.getMetadata();
  }
  protected async getTableName(): Promise<string> {
    const { tableName } = this.getEntityMetadata().options;
    return tableName;
  }
  protected async init(): Promise<void> {
    this.tableName = await this.getTableName();

    await this.getSchemaDefinition();
    await this.setupModel(this.tableName);
  }

  protected getEntityMetadata(): EntityMetadata {
    return getDatabaseMetadataStorage().getEntityMetadata(this.metadata.entity);
  }
  protected getMetadata(): RepositoryMetadata {
    return getDatabaseMetadataStorage().getRepositoryMetadata(
      (this as any).constructor,
    );
  }

  protected async getSchemaDefinition(): Promise<void> {
    if (isNotNilOrEmpty(this.schemaDefinition)) return;
    const attributes: Map<string | symbol, AttributeDefinition> =
      getDatabaseMetadataStorage().getEntityAttributesMetadata(
        this.metadata.entity,
      );
    const definition: SchemaDefinition = {};
    attributes.forEach(
      (
        attributeDefinition: AttributeDefinition,
        attributeName: string | symbol,
      ) => {
        definition[attributeName as string] = attributeDefinition;
      },
    );
    this.schemaDefinition = definition;
  }
  protected async setupModel(tableName: string): Promise<void> {
    this.model = model(
      tableName,
      new Schema(this.schemaDefinition, this.getSchemaSettings()),
      {
        create: true,
      },
    );
  }
  public async exists(key: InputKey): Promise<boolean> {
    return (await this.model.get(key, { consistent: false })) === undefined;
  }

  protected getSchemaSettings(): SchemaSettings {
    return {};
  }
  public async findAll(): Promise<Entity[]> {
    const results = await this.scan();
    return this.mapResultsToEntities(results);
  }
  protected async get(
    key: InputKey,
    consistent?: boolean,
  ): Promise<Entity | null> {
    await this.init();
    const item: Item = await this.model.get(key, { consistent });
    if (item === undefined) {
      return null;
    }
    return this.mapItemToEntity(item);
  }

  protected async scan(filter?: ObjectType): Promise<Entity[]> {
    await this.init();
    const results = await this.model.scan(filter).all().exec();
    return this.mapResultsToEntities(results);
  }

  protected async query(
    filter?: ObjectType,
    index?: string,
  ): Promise<Entity[]> {
    await this.init();
    let query = this.model.query(filter).all();
    if (index !== undefined) {
      query = query.using(index);
    }
    const results = query.exec();
    return this.mapResultsToEntities(results);
  }

  public async updateOne(
    inputKey: InputKey,
    entity: Partial<Entity>,
  ): Promise<Entity> {
    await this.init();
    const item: Item = await this.model.update(inputKey, entity);
    return this.mapItemToEntity(item);
  }

  public async createOne(entity: Entity): Promise<Entity> {
    await this.init();
    const item: Item = await this.model.create(entity as Partial<Item>);
    return this.mapItemToEntity(item);
  }

  private mapItemToEntity(item: Item): Entity {
    return plainToClass(
      this.metadata.entity as unknown as ClassConstructor<Entity>,
      item,
    );
  }
  // we need any type here, that's how it's typed inside dynamoose
  public mapResultsToEntities(results: any): Entity[] {
    return plainToClass(
      this.metadata.entity as unknown as ClassConstructor<Entity>,
      results,
    ) as unknown as Entity[];
  }
}
