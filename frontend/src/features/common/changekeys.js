import * as changeCase from 'change-case';
import { nullFlavors } from '@src/components/nullFlavours';

const isObject = (object) => object !== null && typeof object === 'object';

function changeKeysFactory (changeCase) {
    return function changeKeys (object, depth = -1, options) {
        if (depth === 0 || !isObject(object)) { return object; }

        if (Array.isArray(object)) {
            return object.map((item) => changeKeys(item, depth - 1, options));
        }

        const result = Object.create(Object.getPrototypeOf(object));

        Object.keys(object).forEach((key) => {
            const value = object[key];
           
            let changedKey = '';
            if (key === 'null_flavor') {
                changedKey = 'nullFlavor';
            } else if (key !== 'value' && key !== 'id' && isNaN(key) && key !== 'parsing' && key !== 'business') {
                changedKey = changeCase(key, options);
            } else {
                if (!isNaN(key)) {
                    changedKey = Number.parseInt(key);
                }
                changedKey = key;
            }

            let changedValue = changeKeys(value, depth - 1, options);
            if (changedKey === 'nullFlavor') {
                if (changedValue !== null) {
                    changedValue = Object.keys(nullFlavors).find(key => nullFlavors[key] === changedValue);
                }
            }
            if (changedKey.indexOf('Meddra') >= 0) {
                changedKey = changedKey.replace('Meddra', 'MedDRA');
            }
            if (changedKey.indexOf('Mpid') >= 0) {
                changedKey = changedKey.replace('Mpid', 'MPID');
            }
            if (changedKey.indexOf('Phpid') >= 0) {
                changedKey = changedKey.replace('Phpid', 'PhPID');
            }
            if (changedKey.indexOf('id') >= 0 && changedKey !== 'id' && changedKey.indexOf('MiddleName') < 0 && changedKey.indexOf('Identification') < 0) {
                changedKey = changedKey.replace('id', 'ID');
            }
            
            result[changedKey] = changedValue;
        });

        return result;
    };
}

function findPrefix (str) {
    const regex = new RegExp('_[a-z]{3,}', 'g');
    const match = str.match(regex);

    if (match) {
        // Assuming we're interested in the first occurrence
        const startIndex = str.indexOf(match[0]);
        return startIndex + 1;
    } else {
        return -1; // Pattern not found
    }
}

function pascalSnakeCase (input, options) {
    const prefixEnd = findPrefix(input);

    return changeCase.constantCase(input.substr(0, 1)) + input.substr(1, prefixEnd - 2) + '_' + changeCase.capitalCase(input.substr(prefixEnd), { delimiter: '' });
}

export const e2bCaseKeys = changeKeysFactory(pascalSnakeCase);
