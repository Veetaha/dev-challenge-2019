import { Min, Max, IsInt, ValidateNested } from 'class-validator';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { SpaceRoute } from '../space-route/space-route.entity';

@Entity()
export class SpaceRouteQuery {
    @PrimaryGeneratedColumn() id!: number;

    @CreateDateColumn() creationDate!: Date;

    @ValidateNested({ each: true })
    @OneToMany(_type => SpaceRoute, route => route.query, { cascade: ['insert'] })
    routes!: SpaceRoute[];

    @IsInt()
    @Column() spaceshipId!:   number;

    @IsInt() 
    @Min(0) 
    @Max(99)
    @Column() sector!: number;
}
