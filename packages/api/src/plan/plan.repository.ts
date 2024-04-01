import { Injectable } from '@nestjs/common';

import { PlanEntity } from './plan.entity';
import { BaseRepository } from '../dynamodb/repository';
import { EntityRepository } from '../dynamodb/entity-repository.decorator';

@Injectable()
@EntityRepository(PlanEntity)
export class PlanRepository extends BaseRepository<PlanEntity> {
  public async findOne(id: string): Promise<PlanEntity | null> {
    return await this.get({ id });
  }
}
