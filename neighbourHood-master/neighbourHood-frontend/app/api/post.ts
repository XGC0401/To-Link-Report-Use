import axios from 'axios';
import type { Post } from '~/api/types/post';
import { Storage } from '../utils/storage';
import type { BasicResponse } from './types/common';

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
    // Redirect to login if no valid token
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
    throw new Error('No valid authentication token')
  }
  return {
    headers: {
      'Authorization': 'Bearer ' + token,
    }
  }
}

export type APIResponse<T> = [null, T, Options?] | [Error, Options?];

export type Options = { headers?: Record<string, any>; code?: number; message?: String };

export async function getPost(): Promise<APIResponse<BasicResponse<Post[]>>> {
  try {
    const { data, headers } = await axiosInstance.get<BasicResponse<Post[]>>(`/post/`, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function publishPost(formdata: FormData): Promise<APIResponse<BasicResponse<Boolean>>> {
  try {
    const { data, headers } = await axiosInstance.post<BasicResponse<Boolean>>(`/post/create-post`, formdata, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function likePost(postID: number): Promise<APIResponse<BasicResponse<Boolean>>> {
  try {
    const token = getToken()
    if (!token) {
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
      throw new Error('No valid authentication token')
    }
    const likeConfig = {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    };
    const { data, headers } = await axiosInstance.post<BasicResponse<Boolean>>(`/post/like-post`, postID, likeConfig);
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}