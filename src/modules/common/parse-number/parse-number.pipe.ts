import * as Vts from 'vee-type-safe';
import { PipeTransform, Injectable } from "@nestjs/common";

@Injectable()
export class ParseNumberPipe implements PipeTransform<string, number> {

    constructor(private readonly numTypeDescr: Vts.TypeDescription<number>) {}

    transform(value: string) {
        const number = Number.parseFloat(value);
        Vts.ensureMatch(number, this.numTypeDescr);
        return number;
    }
}