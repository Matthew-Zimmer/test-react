import { Field, ObjectType } from "@nestjs/graphql";
import { ArrayAggregation } from "../../../util";

@ObjectType()
export class PostSummary {
    @Field(() => ArrayAggregation)
    total?: ArrayAggregation;
}
