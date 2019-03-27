import * as I from '@app/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService {

    /**
     * Converts pagination tuple, that is returned by TypeOrm's `find()` methods
     * to plain `{ data: TEntity[], total: number }` object.
     * 
     * @param param0 TypeOrm pagination tuple to convert
     */
    pageTupleToObj<TEntity extends I.Obj>([data, total]: [TEntity[], number]) {
        return { data, total };
    }
}
