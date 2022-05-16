import { ArgsType, Field } from "@nestjs/graphql";

@ArgsType()
export class CreateAuthorArgs {
    @Field(() => String)
    // @ts-expect-error
    firstName: string;

    @Field(() => String)
    // @ts-expect-error
    lastName: string;
}
