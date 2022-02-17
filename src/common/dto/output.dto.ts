/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreOutput {
  @Field((type) => String, { nullable: true })
  message: string;

  @Field((type) => Boolean)
  error?: boolean;

  @Field((type) => Boolean)
  ok: boolean;

  @Field((type) => String)
  code: string;
}
