import axios from 'axios';
import { toSnakeCase } from './formatting';
import { Params } from '../types';

export const get = async ({ url, data = {} }: Params): Promise<any> => {
  const response = await axios.get(url, toSnakeCase(data));
  return response.data;
};
export const post = async ({ url, data = {} }: Params): Promise<any> => {
  const response = await axios.post(url, toSnakeCase(data));
  return response.data;
};
export const patch = async ({ url, data = {} }: Params): Promise<any> => {
  const response = await axios.patch(url, toSnakeCase(data));
  return response.data;
};
export const put = async ({ url, data = {} }: Params): Promise<any> => {
  const response = await axios.put(url, toSnakeCase(data));
  return response.data;
};
export const destroy = async ({ url, data = {} }: Params): Promise<any> => {
  const response = await axios.delete(url, toSnakeCase(data));
  return response.data;
};