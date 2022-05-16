import { Field, ID, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';


@ObjectType()
export class Event {
    @Field(() => ID)
    userID?: string;

    @Field(() => String)
    domain?: string;

    @Field(() => String)
    kind?: string;

    @Field(() => String, { nullable: true })
    type?: string;

    @Field(() => ID)
    resourceID?: string;

    @Field(() => GraphQLJSON)
    details?: any;
}
