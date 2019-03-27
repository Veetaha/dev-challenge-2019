import { IsInt, Min, validateSync } from "class-validator";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class SpaceRoute {
    @IsInt() 
    @Min(0) 
    @PrimaryColumn() sector: number;

    @IsInt() 
    @Min(1) 
    @PrimaryColumn() securityLevel: number;
    
    @IsInt()
    @Min(0)
    @Column() beginIndex: number; // inclusive

    @IsInt()
    @Min(0)
    @Column() endIndex:   number; // inclusive

    isEmpty() {
        return validateSync(this).length === 0;
    }

    constructor(data = { beginIndex: -1, endIndex: -1, sector: -1, securityLevel: -1 }) {
        this.beginIndex    = data.beginIndex;
        this.endIndex      = data.endIndex;
        this.sector        = data.sector;
        this.securityLevel = data.securityLevel;
    }

}