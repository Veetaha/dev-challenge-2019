import * as Fs from 'fs';
import * as Util from 'util';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from './config.service';

const readFile = Util.promisify(Fs.readFile);

@Injectable()
export class SpaceGatesService implements OnModuleInit {
    private gates!: number[][];

    constructor(
        private readonly config: ConfigService
    ) {}

    async onModuleInit() {
        await this.loadGatesFromFileOrThrow(this.config.gatesFilePath);
    }

    /**
     * Reads and deserializes gates matrix from the given file at `filePath`.
     * 
     * @param filePath Path to the target file to deserialize.
     */
    async loadGatesFromFileOrThrow(filePath: string) {
        const serializedGates = await readFile(filePath, 'utf8');

        this.gates = serializedGates
            .split('\n')
            .map(level => level
                .split(' ')
                .map(gate => {
                    const gateNumber = parseInt(gate, 10);
                    if (!SpaceGatesService.validGateNumberOrThrow(gateNumber)) {
                        throw new Error(`Invalid gate number '${gateNumber}' in file ${filePath}`);
                    }
                    return gateNumber;
                })
            );
    }

    /**
     * Returns gates matrix previously read from file.
     */
    getGates() {
        return this.gates;
    }



    private static validGateNumberOrThrow(suspect: number) {
        return !Number.isNaN(suspect) && Number.isFinite(suspect) && suspect >= 0;
    }

}
