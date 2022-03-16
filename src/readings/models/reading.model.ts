import { TaxonomyTagModel } from '@app/taxonomy/models/taxonomy-tags.model';
import { UserModel } from '@core/modules/user/models/user.model';
import { AsEither, AsOutput } from '@core/validators';
import { Field, ObjectType, ID, Float } from '@nestjs/graphql';
import { ApiResponseProperty } from '@nestjs/swagger';
import { IsDecimal, IsOptional, IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@ObjectType()
@Entity({ name: 'readings' })
export class ReadingModel {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsOptional(AsEither)
  @IsUUID('4', AsOutput)
  @ApiResponseProperty()
  id?: string;

  @ManyToOne(() => UserModel, (user: UserModel) => user.readings, {
    nullable: false,
  })
  @Field((type) => UserModel, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  @ApiResponseProperty()
  public user: UserModel;

  @ManyToOne(() => UserModel, {
    nullable: false,
  })
  @Field((type) => UserModel, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  @ApiResponseProperty()
  public creator: UserModel;

  @Field((type) => Float)
  @Column({ name: 'value', nullable: false, type: 'float' })
  @IsDecimal()
  @ApiResponseProperty()
  value: number;

  @Field({ nullable: false })
  @CreateDateColumn({ name: 'date_created', type: 'timestamptz' })
  @IsOptional(AsEither)
  @ApiResponseProperty()
  dateCreated?: Date;

  @Field({ nullable: false })
  @UpdateDateColumn({ name: 'last_updated', type: 'timestamptz' })
  @IsOptional(AsEither)
  @ApiResponseProperty()
  lastUpdated?: Date;

  @ManyToOne(
    () => TaxonomyTagModel,
    (taxonomy: TaxonomyTagModel) => taxonomy.readings,
    { nullable: false },
  )
  @Field((type) => TaxonomyTagModel, { nullable: false })
  @JoinColumn({ name: 'type_id' })
  @ApiResponseProperty()
  public type: TaxonomyTagModel;
}
