// @ts-check
const ModuleAlias = require('module-alias');
const Path        = require('path');
const _           = require('lodash');

function removeTrailingSlashStar(str){ 
    return /(.*?)\/?\*$/.exec(str)[1];
}

function mapTsConfigAliasesToModuleAliases({paths, baseUrl}) {
    return _.transform(paths, (result, value, key) => {
        result[removeTrailingSlashStar(key)] = Path.resolve(
            __dirname, 'dist', baseUrl, removeTrailingSlashStar(value)
        );
        return result;
    }, {});
}


const aliases = mapTsConfigAliasesToModuleAliases(
    // @ts-ignore
    require('./tsconfig.json').compilerOptions
);

console.log('Using path aliases:', JSON.stringify(aliases, null, 4));

ModuleAlias.addAliases(aliases);