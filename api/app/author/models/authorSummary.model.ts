import { Field, ObjectType } from "@nestjs/graphql";
import { ArrayAggregation } from "../../../util";

@ObjectType()
export class AuthorSummary {
    @Field(() => ArrayAggregation)
    total?: ArrayAggregation;
}
