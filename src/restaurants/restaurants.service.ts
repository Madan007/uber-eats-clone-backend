import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { updateRestaurantDto } from './dto/updateRestaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepository.find();
  }

  createRestaurant(restaurantData: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = this.restaurantRepository.create(restaurantData);
    return this.restaurantRepository.save(newRestaurant);
  }

  updateRestaurant(restaurantData: updateRestaurantDto) {
    const { id, data } = restaurantData;
    return this.restaurantRepository.update(id, { ...data });
  }
}
