import { ApiResponseProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AsEither, AsInput, AsOutput } from '@core/validators';
import { TaxonomyModel } from './taxonomy.model';

@ObjectType()
@Entity({ name: 'taxonomy_tags' })
export class TaxonomyTagModel {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsOptional(AsEither)
  @IsUUID('4', AsOutput)
  @ApiResponseProperty()
  id?: string;

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

  @Field((type) => String)
  @Column({ name: 'name' })
  @IsString(AsEither)
  @ApiResponseProperty()
  name: string;

  @ManyToOne(() => TaxonomyModel, (taxonomy: TaxonomyModel) => taxonomy.tags)
  @Field((type) => TaxonomyModel, { nullable: false })
  @JoinColumn({ name: 'taxonomy_id' })
  @ApiResponseProperty()
  public taxonomy: TaxonomyModel;

  @ManyToOne(
    () => TaxonomyTagModel,
    (taxonomy: TaxonomyTagModel) => taxonomy.children,
    { nullable: true },
  )
  @Field((type) => TaxonomyTagModel, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  @ApiResponseProperty()
  public parent: TaxonomyTagModel;

  @OneToMany(
    () => TaxonomyTagModel,
    (taxonomy: TaxonomyTagModel) => taxonomy.parent,
    { nullable: true },
  )
  @Field((type) => TaxonomyTagModel, { nullable: true })
  @ApiResponseProperty()
  public children?: TaxonomyTagModel[];
}
