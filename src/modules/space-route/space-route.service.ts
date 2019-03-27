import * as Fs from 'fs';
import * as Util from 'util';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ConfigService } from '@modules/config';
import { SpaceRoute } from '@modules/space-route';
import { AlgorithmsService } from '@modules/utils';

import { SpaceRouteRepository } from './space-route.repository';



const readFile = Util.promisify(Fs.readFile);

@Injectable()
export class SpaceRouteService implements OnModuleInit {
    private gates!: number[][];

    constructor(
        @InjectRepository(SpaceRouteRepository)
        private readonly repo:       SpaceRouteRepository,
        private readonly config:     ConfigService,
        private readonly algo:       AlgorithmsService
    ) {}

    async onModuleInit() {
        await this.loadGatesFromFileOrFail(this.config.gatesFilePath);
    }

    /**
     * Reads and deserializes gates matrix from the given file at `filePath`.
     * 
     * @param filePath Path to the target file to deserialize.
     * 
     * @throws Error if file read error occured or detected invalid gate.
     */
    async loadGatesFromFileOrFail(filePath: string) {
        const serializedGates = await readFile(filePath, 'utf8');

        this.gates = serializedGates
            .split('\n')
            .map(level => level
                .split(' ')
                .map(gate => {
                    const gateNumber = parseInt(gate, 10);
                    if (!this.isValidGateNumber(gateNumber)) {
                        throw new Error(`Invalid gate number '${gateNumber}' in file ${filePath}`);
                    }
                    return gateNumber;
                })
            );
    }


    /**
     * Returns `SpaceRoute[]` for the given `sector`. It calculates results
     * on the fly according to the previously loaded file by `loadGatesFromFileOrFail()`.
     * 
     * @param sector Sector to calculate routes for.
     */
    getFromFile(sector: number) {
        return this.gates.reduce((result, row, i) => {
            const rowRoute = this.algo.getFirstSubArrFromSortedWithSum(row, sector);
            if (rowRoute != null) {
                result.push(new SpaceRoute({ 
                    beginIndex: rowRoute.begin,
                    endIndex:   rowRoute.end, 
                    sector, 
                    securityLevel: i + 1 
                }));
            }
            return result;
        }, new Array<SpaceRoute>());
    }

    async saveToDb(routes: SpaceRoute[]) {
        return this.repo.save(routes);
    }

    /**
     * Loads calculated `SpaceRoute[]` from the database.
     * If there was nothing found in the database, `null` is returned.
     * If there is no single route to the given `sector`, empty array is returned.
     * 
     * @param sector 
     */
    getFromDb(sector: number) {
        return this.repo.findForSector(sector);
    }

    getPathsForLevel(level: Pick<SpaceRoute, 'beginIndex' | 'endIndex' | 'securityLevel'>) {
        return this.gates[level.securityLevel - 1]
            .slice(level.beginIndex, level.endIndex + 1);
    }


    private isValidGateNumber(suspect: number) {
        return !Number.isNaN(suspect) && Number.isFinite(suspect) && suspect >= 0;
    }

}
