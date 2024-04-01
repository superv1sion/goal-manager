import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { PlanEntity } from './plan.entity';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './plan.dto';

@Controller('plans')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Get('/:id')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns plan by given id',
  })
  public async getPlanById(
    @Param() params: { id: string },
  ): Promise<PlanEntity> {
    return await this.planService.findOne(params.id);
  }

  @Get('/')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'returns plan by given id',
  })
  public async getAllPlans(): Promise<PlanEntity[]> {
    return await this.planService.findAll();
  }

  @Post('/')
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'creates new plan',
  })
  public async createPlan(@Body() plan: CreatePlanDto): Promise<PlanEntity> {
    return await this.planService.create(plan);
  }
}
