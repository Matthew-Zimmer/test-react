import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ArrayAggregation {
    @Field(() => Int)
    count?: number;
}
