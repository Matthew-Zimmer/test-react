import { Field, ObjectType } from "@nestjs/graphql";
import { PostDetail } from "./postDetail.model";
import { PostSummary } from "./postSummary.model";

@ObjectType()
export class Posts {
    @Field(() => PostSummary)
    summary?: PostSummary;

    @Field(() => [PostDetail])
    details?: PostDetail[];
}
