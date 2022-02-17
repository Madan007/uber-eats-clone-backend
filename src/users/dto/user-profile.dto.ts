/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgsType, Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';

@ArgsType()
export class UserProfileInput {
  @Field((type) => Number)
  id: number;
}

@ObjectType()
export class ProfileDataInfo {
  @Field((type) => Number, { nullable: true })
  id: number;

  @Field((type) => String, { nullable: true })
  email: string;

  @Field((type) => String, { nullable: true })
  role: string;

  @Field((type) => Date, { nullable: true })
  createdDate: Date;

  @Field((type) => Date, { nullable: true })
  updatedDate: Date;
}

@ObjectType()
export class UserProfileOutput extends CoreOutput {
  @Field((type) => ProfileDataInfo)
  userProfile: ProfileDataInfo;
}
