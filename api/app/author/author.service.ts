import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { CRUDService } from '../../util/services/crudService';
import { WhereClause } from '../clause/input';
import { EventService } from '../event/event.service';
import { Author } from './models';

@Injectable()
export class AuthorsService extends CRUDService('user') {
    protected transformWhereClause(where: WhereClause): { ids?: string[]; } {
        return where;
    }

    canChangeAuthorName(cur: User): boolean {
        return true;
    }
}