import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class ChangeAuthorNameArgs {
    @Field(() => ID)
    // @ts-expect-error
    id: string;

    @Field(() => String, { nullable: true })
    firstName?: string;

    @Field(() => String, { nullable: true })
    lastName?: string;
}
