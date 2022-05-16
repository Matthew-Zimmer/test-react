import { Field, ID, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
export class SimpleEvent {
    @Field(() => ID)
    userID?: string;

    @Field(() => String)
    domain?: string;

    @Field(() => String)
    kind?: string;

    @Field(() => ID)
    resourceID?: string;
}
