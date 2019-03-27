import * as I from '@app/interfaces';
import * as Vts from 'vee-type-safe';
import * as Express from 'express';
import { createParamDecorator, BadRequestException } from '@nestjs/common';
import { validateSync } from 'class-validator';


import { PaginationParams } from './pagination.dto';
import { ApiImplicitQuery } from '@nestjs/swagger';


export const Pagination = createParamDecorator(
    (_data: void, {query}: Express.Request) => {
        Vts.ensureDuckMatch(query, { limit: 'string', offset: 'string'});
        const params = new PaginationParams({
            limit:  parseInt(query.limit, 10),
            offset: parseInt(query.offset, 10)
        });
        const err = validateSync(params);
        if (err.length !== 0) {
            throw new BadRequestException(err.toString());
        }
        return params;
    }
);


export const ApiPaginationImplicitQuery: I.MethodDecorator = (...args) => {
    ApiImplicitQuery({
        name: 'limit',
        type: Number,
        description: 'Minimum amount of entities to return (maximum 500)'
    })(...args);

    ApiImplicitQuery({
        name: 'offset',
        type:  Number,
        description: 'Pagination zero-based offset index'
    })(...args);
};