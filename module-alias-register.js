// @ts-check
const ModuleAlias = require('module-alias');
const Path = require('path');
const _ = require('lodash');

// @ts-ignore
const { paths, baseUrl } = require('./tsconfig.json').compilerOptions;


function removeSlashStar(str) {
    return /(.*?)\/?\*$/.exec(str)[1];
}

const aliases = _.transform(paths, (result, value, key) => {
    result[removeSlashStar(key)] = Path.resolve(
        __dirname, 'dist', baseUrl, removeSlashStar(value)
    );
    return result;
}, {});
console.log('Using path aliases:', JSON.stringify(aliases, null, 4));

ModuleAlias.addAliases(aliases);