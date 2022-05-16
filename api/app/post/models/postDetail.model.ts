import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class PostDetail {
    @Field(() => ID)
    id?: string;
}
