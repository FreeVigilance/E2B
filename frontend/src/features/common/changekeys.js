import * as changeCase from 'change-case';

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
            if (key !== 'value') {
                changedKey = changeCase(key, options);
            } else {
                changedKey = key;
            }

            const changedValue = changeKeys(value, depth - 1, options);

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
