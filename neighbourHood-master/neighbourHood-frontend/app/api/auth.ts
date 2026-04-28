import axios from 'axios';
import type { BasicResponse, loginParams, User } from '~/api/types/common';
import { Storage } from "../utils/storage"

const axiosInstance = axios.create({
  baseURL: "https://mature-jobina-cowball0905-f72ad790.koyeb.app/api"
});

const isValidJwt = (token: string) => token.split('.').length === 3;

const getToken = () => {
  const token = Storage.get("token")
  if (token && token !== 'null' && token !== 'undefined') {
    if (isValidJwt(token)) {
      return token
    }
    Storage.remove("token")
  }

  const legacyToken = Storage.get("userToken")
  if (legacyToken && legacyToken !== 'null' && legacyToken !== 'undefined') {
    if (isValidJwt(legacyToken)) {
      Storage.set("token", legacyToken)
      return legacyToken
    }
    Storage.remove("userToken")
  }

  return null
}

// Helper function to get config with current token
const getConfig = () => {
  const token = getToken()
  if (!token) {
    throw new Error('No valid authentication token')
  }
  return {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
}

export type APIResponse<T> = [null, T, Options?] | [Error, Options?];

export type Options = { headers?: Record<string, any>; code?: number; message?: String };

export async function login(params: loginParams): Promise<APIResponse<BasicResponse<String>>> {
  try {
    const { data, headers } = await axiosInstance.post<BasicResponse<String>>(`/login`, { email: params.email, password: params.password });
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function getUser(): Promise<APIResponse<User>> {
  try {
    const { data, headers } = await axiosInstance.get<User>(`/admin/user`, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function updateEmail(email: string): Promise<APIResponse<BasicResponse<String>>> {
  try {
    const { data, headers } = await axiosInstance.post<BasicResponse<String>>(`/admin/user/email`, { email }, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}