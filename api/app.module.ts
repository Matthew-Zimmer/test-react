import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthorModule } from './app/author/author.module';
import { CommentModule } from './app/comment/comment.module';
import { PostModule } from './app/post/post.module';
import { EventModule } from './app/event/event.module';

@Module({
    imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'schema.gql',
            subscriptions: {
                //'subscriptions-transport-ws': true,
                'graphql-ws': true
            },
        }),
        AuthorModule,
        CommentModule,
        PostModule,
        EventModule
    ],
})
export class AppModule { }
