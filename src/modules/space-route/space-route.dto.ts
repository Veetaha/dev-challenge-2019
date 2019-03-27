import * as I from '@app/interfaces';

import { ApiModelProperty } from '@nestjs/swagger';

export class SpaceRouteResponse {

    @ApiModelProperty({ description: 'Level of danger.' })
    securityLevel: number;

    @ApiModelProperty({ type: [Number], description: 'Sequence of gate numbers.' })
    gates: number[];

    constructor(data: I.CoreObjData<SpaceRouteResponse>) {
        this.gates         = data.gates;
        this.securityLevel = data.securityLevel;
    }
}