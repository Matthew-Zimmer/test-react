import { Injectable } from '@nestjs/common';
import { Comment, Post, PrismaClient, User } from '@prisma/client';
import { WhereClause } from '../../app/clause/input';
import { EventService } from '../../app/event/event.service';

const prisma = new PrismaClient();

interface Models {
    user: User,
    comment: Comment,
    post: Post
}

export function CRUDService<D extends keyof Models>(domain: D) {
    @Injectable()
    abstract class CRUDService_ {
        constructor(
            private readonly eventService: EventService
        ) { }

        protected abstract transformWhereClause(where: WhereClause): { ids?: string[] };

        async findMany(where?: WhereClause) {
            const transformedWhere = this.transformWhereClause(where ?? {});

            const [count, users] = await Promise.all([
                prisma.user.aggregate({ _count: true }),
                prisma.user.findMany({
                    where: {
                        id: {
                            in: transformedWhere.ids
                        }
                    }
                }),
            ]);

            return { summary: { total: { count: count._count } }, details: users };
        }

        async find(id: string): Promise<Models[D]> {
            return (prisma[domain] as any).findUnique({ where: { id } });
        }

        async insert(userID: string, data: Omit<Required<Models[D]>, 'id' | 'updatedAt' | 'createdAt'>) {
            const user = await (prisma[domain] as any).create({ data });

            this.eventService.insert({ userID, domain, kind: 'insert', type: 'regular', details: { id: user.id }, resourceID: user.id });

            return user;
        }

        async delete(userID: string, id: string) {
            const user = await (prisma[domain] as any).delete({ where: { id } });

            this.eventService.insert({ userID, domain, kind: 'delete', type: 'regular', details: user, resourceID: id });

            return user;
        }

        async update(userID: string, type: string, old: Models[D], update: Partial<Omit<Models[D], 'id'>>) {
            const { id } = old;

            const updated = await (prisma[domain] as any).update({ where: { id }, data: update });

            this.eventService.insert({ userID, domain, kind: 'update', type, details: this.eventService.diff(old, updated), resourceID: id });

            return updated;
        }
    }

    return CRUDService_;
}


