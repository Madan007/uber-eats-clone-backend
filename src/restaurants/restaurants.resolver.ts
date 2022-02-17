/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { updateRestaurantDto } from './dto/updateRestaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: boolean): Promise<Restaurant[]> {
    return this.restaurantService.getAllRestaurants();
  }

  @Mutation((returns) => Restaurant)
  async createRestaurant(
    @Args('input') createRestaurantData: CreateRestaurantDto,
  ): Promise<Restaurant> {
    try {
      return await this.restaurantService.createRestaurant(
        createRestaurantData,
      );
    } catch (err) {
      console.log(err);
    }
  }

  @Mutation((returns) => Boolean)
  async updateRestaurant(
    @Args('input') updateRestaurantData: updateRestaurantDto,
  ): Promise<boolean> {
    try {
      await this.restaurantService.updateRestaurant(updateRestaurantData);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
