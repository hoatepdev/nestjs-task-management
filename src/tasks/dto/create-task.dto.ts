import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title task',
    default: 'Workout',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description task',
    default: '10 Pushup',
  })
  @ApiProperty()
  @IsNotEmpty()
  description: string;
}
