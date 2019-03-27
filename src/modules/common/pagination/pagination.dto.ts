import * as I from '@app/interfaces';
import { IsInt, Min, Max } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';


export class PaginationParams {
    
    @ApiModelProperty({ description: 'Zero-based pagination offset.' })
    @IsInt()
    @Min(0)
    offset!: number;

    @ApiModelProperty({ description: 'Maximum amount of instances to query' })
    @IsInt()
    @Min(0)
    @Max(500)
    limit!: number;

    constructor(data: I.CoreObjData<PaginationParams>) {
        this.offset = data.offset;
        this.limit  = data.limit;
    }

}