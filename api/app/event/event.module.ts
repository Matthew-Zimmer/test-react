import { Module } from '@nestjs/common';
import { SubscriptionService } from '../../util/services/subscriptionService';
import { EventResolver } from './event.resolver';
import { EventService } from './event.service';

@Module({
    providers: [EventResolver, EventService, SubscriptionService],
})
export class EventModule { }
