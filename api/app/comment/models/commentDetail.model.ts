import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CommentDetail {
    @Field(() => ID)
    id?: string;
}
