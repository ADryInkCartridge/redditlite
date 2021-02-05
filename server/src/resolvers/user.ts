import { User } from "../entities/User";
import { MyContext } from "src/types";
import {
  Resolver,
  Mutation,
  Arg,
  InputType,
  Field,
  Ctx,
  ObjectType,
  Query,
} from "type-graphql";
import argon2 from "argon2";

@InputType()
class usernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  field: string;

  @Field(() => String)
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class userResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext) {
    if (!req.session.userID) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userID });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: usernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Length must be greater than 2",
          },
        ],
      };
    }
    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "Password must be greater than 2",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      username: options.username,
      password: hashedPassword,
    });
    try {
      // Bisa make knex
      await em.persistAndFlush(user);
    } catch (e) {
      if (e.code === "23505" || e.details.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "Username already taken",
            },
          ],
        };
      }
    }
    req.session.userID = user.id;
    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: usernamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "invalid password",
          },
        ],
      };
    }
    req.session.userID = user.id;
    return {
      user,
    };
  }
}
