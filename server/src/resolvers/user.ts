import {
  Query,
  Resolver,
  Arg,
  InputType,
  Ctx,
  Field,
  Mutation,
  ObjectType,
} from "type-graphql";
import { MyContext } from "../types";
import { User } from "../entities/User";
import * as argon2 from "argon2";

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldEror {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldEror], { nullable: true })
  errors?: FieldEror[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session!.userId) {
      return null;
    }
    const user = await em.findOne(User, {
      id: req.session!.userId,
    });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Too short",
          },
        ],
      };
    }

    if (options.password.length <= 6)
      return {
        errors: [
          {
            field: "password",
            message: "Password too short",
          },
        ],
      };
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (error) {
      if (error.code === "23505" || error.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        };
      }
    }
    req.session!.userId = user.id;

    return {
      user,
    };
  }

  @Query(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Incorrect Credentails",
          },
        ],
      };
    }

    req.session!.userId = user.id;

    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect Credentails",
          },
        ],
      };
    }
    return {
      user,
    };
  }
}
