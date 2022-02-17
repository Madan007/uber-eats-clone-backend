import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType()
export class updateRestaurantInput extends PartialType(CreateRestaurantDto) {}

@InputType()
export class updateRestaurantDto {
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @Field((type) => updateRestaurantInput)
  data: updateRestaurantInput;
}
