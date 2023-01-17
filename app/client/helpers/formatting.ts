import _ from 'lodash';
import _inflection from 'lodash-inflection';
import { User } from '../types';
_.mixin(_inflection);

export const validUrlToken = (path: string): null | string => {
  const pattern = /^((https?:\/\/)?(accord\.com\/))?[\w\-]{10}$/;
  const isValid = path.match(pattern);
  if (isValid) return isValid[0].slice(-10);
  return null;
};

const splitName = (name: string, char: string): string => {
  let newName = name.split(char).map((word) => {
    for (let i=0; i < word.length; i++) {
      if (word[i] !== ' ') return word[i];
    }
  }).join('').slice(0, 5);
  return newName;
};

export const serverInitials = (name: string): string => {
  if (name) {
    if (name.includes(' ')) return name.split(' ').map((word) => word[0]).join('');
    else if (name.includes('-')) return splitName(name, '-');
    else if (name.includes('/')) return splitName(name, '/');
    else if (name.includes('_')) return splitName(name, '_');
    return name[0];
  }
  return '';
};

export const buildUrl = (itemType, itemId = null) => {
  const itemText = itemType.match(/^session$/i) ? 'session' : _.pluralize(itemType);
  return itemId ? `/api/${itemText}/${itemId}` :  `/api/${itemText}`;
};

const convertToCase = (caseType: string, obj: object): object => {
  const converter = _[caseType.concat('Case')];
  if (!converter) return obj;

  return _.transform(obj, (acc: object, value: any, key: string, target: any) => {
    const convertedKey = _.isArray(target) || key[0] === '&' ? key : converter(key);
    acc[convertedKey] = _.isObject(value) ? convertToCase(caseType, value) : value;
  });
};

export const toSnakeCase = (obj: object): object => convertToCase('snake', obj);

export const convertToSnakeCase = (obj: object): object => toSnakeCase(obj);

export const printTime = (createdAt: string, expiration: number): string => {
  const createdAtDate = new Date(createdAt);
  let expiryTime = (expiration * 3600 * 1000) + createdAtDate.getTime();
  const expiryDate: any = new Date(expiryTime);
  let now: any = new Date();
  let timeLeft: number = (expiryDate - now) / 1000;
  if (timeLeft <= 0) return 'EXPIRED';
  return formatTime(timeLeft);
};

const prependZeroes = (string: string): string => {
  if (string.length < 2) return '0'.concat(string);
  return string;
};

const formatTime = (diffTime: number): string => {
  const days = diffTime / 86400;
  const hours = (days - Math.floor(days)) * 24;
  const minutes = (hours - Math.floor(hours)) * 60;
  const sString = prependZeroes(Math.floor((minutes - Math.floor(minutes)) * 60).toString());
  const mString = prependZeroes(Math.floor(minutes).toString());
  const hString = prependZeroes(Math.floor(hours).toString());
  const dString = prependZeroes(Math.floor(days).toString());

  return `${dString}:${hString}:${mString}:${sString}`;
};

export const extractDateTime = (dateTime: string): string => {
  let dateTimeObj = new Date(dateTime);

  // find the local time
  const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
  let time = dateTimeObj.toLocaleTimeString('en-US', timeOptions);

  // find the local date
  const dateOptions: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric' };
  let date = dateTimeObj.toLocaleDateString('en-US', dateOptions);

  const now = new Date();
  const dateObj = new Date(date);

  now.setMilliseconds(0);
  now.setSeconds(0);
  now.setMinutes(0);
  now.setHours(0);


  if (now.getTime() - dateObj.getTime() === 0) return `Today at ${time}`; // today?
  if (now.getTime() - dateObj.getTime() === 1000 * 60 * 60 * 24) return `Yesterday at ${time}`; // yesterday?
  return date; // more than a day ago
};

export const membersAlphaAsc = (member1: User, member2: User): number => {
  if (member1.localUsername && member2.localUsername) {
    if (member1.localUsername < member2.localUsername) return -1;
    if (member2.localUsername <= member1.localUsername) return 1;
  }
  if (member1.localUsername && !member2.localUsername) {
    if (member1.localUsername < member2.username) return -1;
    if (member2.username <= member1.localUsername) return 1;
  }
  if (!member1.localUsername && member2.localUsername) {
    if (member1.username < member2.localUsername) return -1;
    if (member2.localUsername <= member1.username) return 1;
  }
  if (!member1.localUsername && !member2.localUsername) {
    if (member1.username < member2.username) return -1;
    if (member2.username <= member1.username) return 1;
  }
};

export const limitChars = (string: string, limit: number): string => {
  if (string.length < limit) return string;
  return string.slice(0, limit) + '...';
};