import { IsInt } from 'class-validator';
import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class SectorQuery {
    @PrimaryGeneratedColumn() id?: number;

    @CreateDateColumn() creationDate?: Date;

    @IsInt()
    @Column() spaceshipId: number;
    
    @IsInt()
    @Column() sector: number;

    constructor(data = {sector: -1, spaceshipId: -1}) {
        this.spaceshipId = data.spaceshipId;
        this.sector      = data.sector;
    }
}
