import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { SubscriptionService } from '../../util/services/subscriptionService';
import { Event } from './models';

const prisma = new PrismaClient();

export interface EventData {
    userID: string;
    domain: string;
    kind: string;
    type: string;
    details: any;
}

type DiffType<T> = {
    [P in keyof T]: T[P] extends number | string | boolean ? { before: T[P], after: T[P] } : DiffType<T[P]>;
}

@Injectable()
export class EventService {

    constructor(
        private readonly subscriptionService: SubscriptionService
    ) { }

    async insert(data: Omit<Required<Event>, 'id'>) {
        const event = { id: '', ...data };

        this.subscriptionService.publish('eventTape', {
            eventTape: {
                userID: event.userID,
                domain: event.domain,
                kind: event.kind,
                resourceID: event.resourceID
            }
        });
    }

    diff<T>(prev: T, curr: T): DiffType<T> {
        const keys = Object.keys(prev) as (keyof T)[];

        return keys.reduce((p, key) => ({
            ...p,
            ...(() => {
                const before = prev[key], after = curr[key];
                const diff_primitive = () => before !== after ? { [key]: { before, after } } : {};
                switch (typeof before) {
                    case 'bigint':
                    case 'boolean':
                    case 'number':
                    case 'string':
                    case 'undefined':
                        return diff_primitive();
                    case 'object': {
                        if (Array.isArray(before))
                            return {};
                        else if (before === null || after === null)
                            return diff_primitive();
                        else {
                            return this.diff(before, after);
                        }
                    }
                    case 'symbol':
                    case 'function':
                        throw new Error('Cannot take a diff of a function or symbol');
                }
            })()
        }), {}) as DiffType<T>;
    }
}
