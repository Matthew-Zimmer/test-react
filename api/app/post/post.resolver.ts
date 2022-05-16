import { Query, Resolver } from "@nestjs/graphql";
import { PostService } from "./post.service";
import { Posts } from "./models";

@Resolver()
export class PostResolver {
    constructor(
        private readonly postService: PostService
    ) { }

    @Query(() => Posts)
    async posts() {
        return this.postService.findMany();
    }
}
