import * as I    from '@app/interfaces';
import * as Vts  from 'vee-type-safe';
import * as Fs   from 'fs';
import * as Path from 'path';
import * as Yaml from 'yaml';
import { Injectable } from '@nestjs/common';

export interface ParseFileOptions<TTypeDescr extends Vts.TypeDescription> {
    filePath: string;
    typeDescr: TTypeDescr;
    allowExcessProps: boolean;
}

@Injectable()
export class EnvService {


    /**
     * Tries to read variable from `process.env` and returns its value.
     * @param variableId Environmental variable name.
     * @param defaultVal If default value is provided, it will be returned when
     *                   actual env variable is not defined.
     * 
     * @throws Error if `defaultVal == null` and `process.env[variableId] == null`.
     */
    readEnvOrThrow(variableId: string, defaultVal?: I.Nullable<string>) {
        if (process.env[variableId] != null) {
            return process.env[variableId]!;
        }
        if (defaultVal != null) {
            return defaultVal;
        }
        throw new Error(`failed to read '${variableId}' environment variable`);
    }

    /**
     * Tries to read the contents of the file that resides at `filePath` and to parse
     * it as JSON or YAML according to its extention, resulting value must 
     * conform to the given `typeDescr`.
     * 
     * @param filePath      A path to the target JSON file to read from.
     * @param typeDescr `Vts.TypeDescription` of the target JSON file.
     * 
     * @throws `Error` if failed to read file or parse JSON.
     *         `Vts.TypeMismatchError` if pared json value failed to match to the 
     *          given `jsonTypeDescr`.
     */
    parseFileSyncOrThrow<TTypeDescr extends Vts.TypeDescription>({ 
        filePath, 
        typeDescr, 
        allowExcessProps = false 
    }: ParseFileOptions<TTypeDescr>): Vts.TypeDescriptionTarget<TTypeDescr> {
   
        const parse = this.getParserForExtension(Path.parse(filePath).ext);

        const obj = parse(Fs.readFileSync(filePath, { encoding: 'utf8' }));

        if (allowExcessProps) {
            Vts.ensureDuckMatch(obj, typeDescr);
        } else {
            Vts.ensureMatch(obj, typeDescr);
        }

        return obj;
    }

    private getParserForExtension(ext: string) {
        return (ext === '.json' ? JSON : Yaml).parse;
    }

}
