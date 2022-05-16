import { Module } from '@nestjs/common';
import { SubscriptionService } from '../../util/services/subscriptionService';
import { EventService } from '../event/event.service';
import { AuthorResolver } from './author.resolver';
import { AuthorsService } from './author.service';

@Module({
    providers: [AuthorResolver, AuthorsService, EventService, SubscriptionService],
})
export class AuthorModule { }
