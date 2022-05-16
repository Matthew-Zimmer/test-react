import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class AuthorDetail {
    @Field(() => ID)
    id?: string;

    @Field(() => String)
    firstName?: string;

    @Field(() => String)
    lastName?: string;
}
