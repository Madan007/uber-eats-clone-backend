/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';
import { IsDate, IsNumber } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class CoreEntity {
  @PrimaryGeneratedColumn()
  @Field((type) => Number)
  @IsNumber()
  id: number;

  @CreateDateColumn()
  @Field((type) => Date)
  @IsDate()
  createdDate: Date;

  @UpdateDateColumn()
  @Field((type) => Date)
  @IsDate()
  updatedDate: Date;
}
