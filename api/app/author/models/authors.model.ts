import { Field, ObjectType } from "@nestjs/graphql";
import { AuthorDetail } from "./authorDetail.model";
import { AuthorSummary } from "./authorSummary.model";

@ObjectType()
export class Authors {
    @Field(() => AuthorSummary)
    summary?: AuthorSummary;

    @Field(() => [AuthorDetail])
    details?: AuthorDetail[];
}
