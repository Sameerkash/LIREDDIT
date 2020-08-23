import { Field, ObjectType } from "type-graphql/dist/decorators";
import { Property, PrimaryKey, Entity } from "@mikro-orm/core/dist/decorators";
import { Int } from "type-graphql/dist/scalars";

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String)
  @Property({ type: "date", default: "NOW()" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field(() => String)
  @Property({ type: "text" })
  username!: string;

  @Field(() => String)
  @Property({ type: "text" })
  password!: string;
}
