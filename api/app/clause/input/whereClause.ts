import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class WhereClause {
    @Field(() => [ID])
    ids?: string[];
}
