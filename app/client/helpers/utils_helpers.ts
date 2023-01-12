import _ from 'lodash';
import _inflection from 'lodash-inflection';
_.mixin(_inflection);

export const buildUrl = (itemType, itemId = null) => (
  itemId ? `/api/${_.pluralize(itemType)}/${itemId}` :  `/api/${_.pluralize(itemType)}`
);

const convertToCase = (caseType: string, obj: object): object => {
  const converter = _[caseType.concat('Case')];
  if (!converter) return obj;

  return _.transform(obj, (acc: object, value: any, key: string, target: any) => {
    const convertedKey = _.isArray(target) || key[0] === '&' ? key : converter(key);
    acc[convertedKey] = _.isObject(value) ? convertToCase(caseType, value) : value;
  });
};

export const toSnakeCase = (obj: object): object => convertToCase('snake', obj);