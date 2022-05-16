import { Field, ObjectType } from "@nestjs/graphql";
import { ArrayAggregation } from "../../../util";

@ObjectType()
export class CommentSummary {
    @Field(() => ArrayAggregation)
    total?: ArrayAggregation;
}
