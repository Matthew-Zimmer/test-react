import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Injectable()
export class SubscriptionService {
    listen(...topics: string[]) {
        return pubSub.asyncIterator(topics);
    }

    async publish(topic: string, data: any) {
        return pubSub.publish(topic, data);
    }
}
