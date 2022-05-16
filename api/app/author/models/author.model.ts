import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Author {
    constructor(data: Partial<Author>) {
        Object.assign(this, data);
    }

    @Field(() => ID)
    // @ts-expect-error
    id: string;

    @Field(() => String)
    firstName?: string;

    @Field(() => String)
    lastName?: string;
}
