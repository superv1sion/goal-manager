import { ApiProperty } from '@nestjs/swagger';

export class CreatePlanDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  userId: string;
}
