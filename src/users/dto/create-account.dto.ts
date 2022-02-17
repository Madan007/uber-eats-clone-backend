/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from '../entities/user.entity';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'role',
]) {}

@ObjectType()
class DataInfo {
  @Field((type) => Number, { nullable: true })
  id: number;

  @Field((type) => String)
  email: string;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {
  @Field((type) => DataInfo)
  data: DataInfo;
}
