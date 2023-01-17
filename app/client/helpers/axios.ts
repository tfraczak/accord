import axios from 'axios';
import { toSnakeCase } from './formatting';
import { Params } from '../types';

export const get = async ({ url, data = {} }: Params): Promise<any> => axios.get(url, toSnakeCase(data));
export const post = async ({ url, data = {} }: Params): Promise<any> => axios.post(url, toSnakeCase(data));
export const patch = async ({ url, data = {} }: Params): Promise<any> => axios.patch(url, toSnakeCase(data));
export const put = async ({ url, data = {} }: Params): Promise<any> => axios.put(url, toSnakeCase(data));
export const destroy = async ({ url, data = {} }: Params): Promise<any> => axios.delete(url, toSnakeCase(data));