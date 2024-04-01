import { Attribute } from '../dynamodb/attribute.decorator';
import { Entity } from '../dynamodb/entity.decorator';

@Entity({
  tableName: 'plans',
})
export class PlanEntity {
  @Attribute({ type: String, required: true, hashKey: true })
  id: string;

  @Attribute({ type: String, required: true })
  name: string;

  @Attribute({ type: String, required: true })
  userId: string;
}
