import { Resolver, Subscription } from "@nestjs/graphql";
import { SubscriptionService } from "../../util/services/subscriptionService";
import { EventService } from "./event.service";
import { SimpleEvent } from "./models";

@Resolver()
export class EventResolver {
    constructor(
        private readonly eventService: EventService,
        private readonly subscriptionService: SubscriptionService
    ) { }

    @Subscription(() => SimpleEvent)
    eventTape() {
        return this.subscriptionService.listen('eventTape');
    }
}
