import { ArgsType, Field, ID } from "@nestjs/graphql";

@ArgsType()
export class DeleteAuthorArgs {
    @Field(() => ID)
    // @ts-expect-error
    id: string;
}
