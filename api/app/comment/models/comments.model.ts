import { Field, ObjectType } from "@nestjs/graphql";
import { CommentDetail } from "./commentDetail.model";
import { CommentSummary } from "./commentSummary.model";

@ObjectType()
export class Comments {
    @Field(() => CommentSummary)
    summary?: CommentSummary;

    @Field(() => [CommentDetail])
    details?: CommentDetail[];
}
