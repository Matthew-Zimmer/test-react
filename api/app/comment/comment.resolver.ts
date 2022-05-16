import { Query, Resolver } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { Comments } from "./models";


@Resolver()
export class CommentResolver {
    constructor(
        private readonly commentService: CommentService
    ) { }

    @Query(() => Comments)
    async comments() {
        return this.commentService.findMany();
    }
}
