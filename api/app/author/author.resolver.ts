import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { WhereClause } from "../clause/input";
import { AuthorsService } from "./author.service";
import { ChangeAuthorNameArgs, CreateAuthorArgs, DeleteAuthorArgs } from "./inputs";
import { Authors, Author } from "./models";

function assertIsDefined<T>(t: T | undefined | null, err?: string): asserts t is T {
    if (t === undefined || t === null) throw new Error(err);
}

function assert(b: boolean, err?: string) {
    if (!b) throw new Error(err);
}


@Resolver()
export class AuthorResolver {
    constructor(
        private readonly authorsService: AuthorsService,
    ) { }

    @Query(() => Authors)
    async authors(@Args({ nullable: true, name: 'where' }) where?: WhereClause) {
        return this.authorsService.findMany(where);
    }

    @Mutation(() => Author)
    async createAuthor(@Args() args: CreateAuthorArgs) {
        const { firstName, lastName } = args;

        return this.authorsService.insert('', {
            firstName,
            lastName,
        });
    }

    @Mutation(() => Author)
    async deleteAuthor(@Args() args: DeleteAuthorArgs) {
        const { id } = args;

        return this.authorsService.delete('', id);
    }

    @Mutation(() => Author)
    async changeAuthorName(@Args() args: ChangeAuthorNameArgs) {
        const { id, firstName, lastName } = args;

        const cur = await this.authorsService.find(id);

        assertIsDefined(cur, 'Cannot change the name of non existing author');

        assert(this.authorsService.canChangeAuthorName(cur));

        return this.authorsService.update('', 'changeAuthorName', cur, {
            firstName,
            lastName
        });
    }
}
