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
            type:      'postgres',
            host:      this.env.readEnvOrThrow('DB_HOST'),
            port:      parseInt(this.env.readEnvOrThrow('DB_PORT'), 10),
            username:  this.env.readEnvOrThrow('DB_USER'),
            password:  this.env.readEnvOrThrow('DB_PASSWORD'),
            database:  this.env.readEnvOrThrow('DB_DB'),
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
