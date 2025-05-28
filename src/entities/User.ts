import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ObjectType, Field, Int, registerEnumType } from 'type-graphql';

export enum City {
  TEL_AVIV = 'TEL_AVIV',
  HAIFA = 'HAIFA',
  JERUSALEM = 'JERUSALEM',
}

registerEnumType(City, {
  name: 'City', // for GraphQL schema
});

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  first_name!: string;

  @Field()
  @Column()
  last_name!: string;

  @Field()
  @Column()
  birth_date!: Date;

  @Field(() => City)
  @Column({
    type: 'enum',
    enum: City,
  })
  city!: City;

  @Field()
  @CreateDateColumn()
  created_at!: Date;

  @Field()
  @UpdateDateColumn()
  updated_at!: Date;
}
