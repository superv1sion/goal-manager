import { Injectable, NotFoundException } from '@nestjs/common';
import { PlanRepository } from './plan.repository';
import { PlanEntity } from './plan.entity';
import { create } from 'domain';
import { randomUUID } from 'crypto';
import { CreatePlanDto } from './plan.dto';

@Injectable()
export class PlanService {
  constructor(private readonly planRepository: PlanRepository) {}

  public async findOne(id: string): Promise<PlanEntity> {
    const plan = await this.planRepository.findOne(id);
    if (plan === null) {
      throw new NotFoundException(`plan with id ${id} not found.`);
    }

    return plan;
  }

  public async create(plan: CreatePlanDto): Promise<PlanEntity> {
    const id = randomUUID() as string;
    return await this.planRepository.createOne({ ...plan, id });
  }
  public async findAll(): Promise<PlanEntity[]> {
    return await this.planRepository.findAll();
  }
}
