import { ModelType } from 'dynamoose/dist/General';
import { Item } from 'dynamoose/dist/Task';
import { Schema, SchemaDefinition } from 'dynamoose/dist/Schema';

import { getDatabaseMetadataStorage } from './database-metadata-storage';

export type AttributeType =
  | StringConstructor
  | BooleanConstructor
  | NumberConstructor
  | DateConstructor
  | ObjectConstructor
  | ArrayConstructor
  | SetConstructor
  | Schema
  | ModelType<Item>;

interface IndexDefinition {
  name?: string;
  global?: boolean;
  rangeKey?: string;
}

export interface AttributeDefinition {
  type: AttributeType;
  required?: boolean;
  hashKey?: boolean;
  rangeKey?: boolean;
  schema?:
    | AttributeType
    | AttributeType[]
    | AttributeDefinition
    | AttributeDefinition[]
    | SchemaDefinition
    | SchemaDefinition[];
  index?: boolean | IndexDefinition | IndexDefinition[];
}

export function Attribute(definition: AttributeDefinition): PropertyDecorator {
  return function (object: Object, propertyName: string | symbol) {
    getDatabaseMetadataStorage().attributes.push({
      entity: object.constructor,
      propertyName,
      definition,
    });
  };
}
