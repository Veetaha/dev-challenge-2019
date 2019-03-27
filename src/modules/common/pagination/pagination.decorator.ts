import * as Express from 'express';
import { createParamDecorator } from '@nestjs/common';
import { transformAndValidateSync } from 'class-transformer-validator';

import { PaginationParams } from './pagination.dto';

export const Pagination = createParamDecorator(
    (_data: void, {query}: Express.Request) => transformAndValidateSync(
        PaginationParams, 
        {
            limit:  parseInt(query.limit, 10),
            offset: parseInt(query.offset, 10)
        }
    )
);