/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dto/create-account.dto';
import { LoginInput, LoginOutpt } from './dto/login.dto';
import { UserProfileInput, UserProfileOutput } from './dto/user-profile.dto';
import { User } from './entities/user.entity';
import { UserService } from './users.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query((returns) => Boolean)
  hi() {
    return true;
  }

  @Mutation((returns) => CreateAccountOutput)
  async createAccount(
    @Args('input') accountDetails: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    const response = await this.userService.createAccount(accountDetails);
    console.log('respone *********', response);
    return response;
  }

  @Mutation((returns) => LoginOutpt)
  async Login(@Args('input') LoginDetails: LoginInput): Promise<LoginOutpt> {
    const response = await this.userService.login(LoginDetails);
    console.log('respone *********', response);
    return response;
  }

  @Query((returns) => UserProfileOutput)
  @UseGuards(AuthGuard)
  async userProfile(
    @AuthUser() user: UserProfileInput,
  ): Promise<UserProfileOutput> {
    const response = await this.userService.userProfile(user.id);
    console.log('respone *********', response);
    return response;
  }
}
