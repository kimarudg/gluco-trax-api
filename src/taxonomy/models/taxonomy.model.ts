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
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AsEither, AsInput, AsOutput } from '@core/validators';
import { TaxonomyTagModel } from './taxonomy-tags.model';

@ObjectType()
@Entity({ name: 'taxonomies' })
export class TaxonomyModel {
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

  @ManyToOne(
    () => TaxonomyModel,
    (taxonomy: TaxonomyModel) => taxonomy.children,
    { nullable: true },
  )
  @Field((type) => TaxonomyModel, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  @ApiResponseProperty()
  public parent: TaxonomyModel;

  @OneToMany(() => TaxonomyModel, (taxonomy: TaxonomyModel) => taxonomy.parent)
  @ApiResponseProperty()
  public children?: TaxonomyModel[];

  @OneToMany(() => TaxonomyTagModel, (tag: TaxonomyTagModel) => tag.taxonomy)
  @ApiResponseProperty()
  public tags?: TaxonomyTagModel[];
}
