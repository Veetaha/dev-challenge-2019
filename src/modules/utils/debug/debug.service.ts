import * as Vts from 'vee-type-safe';
import { Injectable } from '@nestjs/common';
import { LoggerService } from '@modules/utils/logger/logger.service';

@Injectable()
export class DebugService {

    constructor(
        private readonly log: LoggerService
    ) {}

    /**
     * Aborts current program execution workflow after invoking `error(payload, description)`.
     * 
     * @param payload       `Error` or vanilla object, which state needs to be logged.
     * @param description   Additional info message to be logged before `payload`.
     */
    shutdown(payload: unknown = 'undefined behaviour', description = ''): never {
        this.log.error(payload, description);
        return process.exit(1);
    }
    


    /**
     * Checks that `Boolean(truthy) === true`, otherwise shutdowns and logs `truthy`.
     * 
     * @param truthy Suspect to be check for truthiness.
     */
    assert(truthy: unknown) {
        if (!truthy) {
            this.shutdown(truthy, `assertion failure`);
        }
    }

    /**
     * Checks that `Boolean(truthy) === false`, otherwise shutdowns and logs `falsy`.
     * 
     * @param falsy Suspect to be check for truthiness.
     */
    assertFalsy(falsy: unknown) {
        if (falsy) {
            this.shutdown(falsy, `assertion failure`);
        }
    }


    /**
     * Checks that `Vts.mismatch(suspect, typeDescr) === null`, otherwise shutdowns
     * and logs returned `MismatchInfo` object.
     * 
     * @param suspect   Value of to be checked for type conformance.
     * @param typeDescr `Vts.TypeDesciption` that `suspect` will be checked to match to.
     */
    assertMatches(suspect: unknown, typeDescr: Vts.TypeDescription) {
        const mismatch = Vts.mismatch(suspect, typeDescr);
        if (mismatch != null) {
            this.shutdown(mismatch, 'type mismatch assertion failure');
        }
    }

}
