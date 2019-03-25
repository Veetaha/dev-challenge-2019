import * as Path from 'path';
import * as Dotenv from 'dotenv';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { EnvService } from '@modules/utils';


Dotenv.config();

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {

    constructor(
        private readonly env: EnvService
    ) {}
    
    gatesFilePath = this.pathFromRoot('gates.txt');

    pathFromRoot(...pathParts: string[]) {
        return Path.normalize(Path.join(__dirname, '../../../../', ...pathParts));
    }

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            host:      this.env.tryReadEnv('DB_HOST'),
            port:      this.env.tryReadEnv('DB_PORT'),
            username:  this.env.tryReadEnv('DB_USER'),
            password:  this.env.tryReadEnv('DB_PASSWORD'),
            database:  this.env.tryReadEnv('DB_DB'),
            entities: [this.pathFromRoot('dist/src/modules/**/*.entity.js')],
            synchronize: true,
        };
    }

    // Auth configs


    /*
    Jwt = {
        // expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d"
        ExpirationTime:    '7d',
        EncodingAlgorithm: 'RS256',
        KeyPair: this.env.readJsonFileSyncOrThrow(
            this.pathFromRoot('.rsa-keypair.json'),
            { 
                private: 'string', 
                public:  'string' 
            }
        ),
    };
    */
}
