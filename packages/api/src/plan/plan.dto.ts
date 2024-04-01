import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  userId: string;
}
