import { IsInt, Min, ValidateNested } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { SpaceRouteQuery } from "@modules/space-route-query";

@Entity()
export class SpaceRoute {
    @PrimaryGeneratedColumn()
    id!: number;

    @ValidateNested()
    @ManyToOne(_type => SpaceRouteQuery, query => query.routes)
    query!: SpaceRouteQuery;

    @IsInt() 
    @Min(1) 
    @Column() securityLevel!: number;
    
    @IsInt()
    @Min(0)
    @Column() beginIndex!: number; // inclusive

    @IsInt()
    @Min(0)
    @Column() endIndex!:   number; // inclusive
}