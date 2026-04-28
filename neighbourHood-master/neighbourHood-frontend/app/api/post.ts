import axios from 'axios';
import type { Post } from '~/api/types/post';
import { Storage } from '../utils/storage';
import type { BasicResponse } from './types/common';

const axiosInstance = axios.create({
  baseURL: "https://mature-jobina-cowball0905-f72ad790.koyeb.app/api"
});

const USE_MOCK_POST_API = true
const MOCK_POSTS_KEY = 'mockApiPosts'

const loadMockPosts = (): Post[] => {
  const cached = localStorage.getItem(MOCK_POSTS_KEY)
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      if (Array.isArray(parsed)) {
        return parsed
      }
    } catch (e) {
      console.error('Failed to parse mock posts', e)
    }
  }

  const seedPosts: Post[] = [
    {
      id: 1001,
      type: 0,
      user: { uuid: 'admin-001', username: 'Admin', email: 'admin@gmail.com' },
      title: 'Welcome to NeighbourHood',
      content: 'This is a frontend-only demo running on Render without backend.',
      request_type: 0,
      share_count: 0,
      acceptUser: null,
      paymentMethod: null,
      is_important: true,
      redeemPoints: 0,
      postPhotos: null,
      createTime: new Date().toISOString() as any
    }
  ]

  localStorage.setItem(MOCK_POSTS_KEY, JSON.stringify(seedPosts))
  return seedPosts
}

const saveMockPosts = (posts: Post[]) => {
  localStorage.setItem(MOCK_POSTS_KEY, JSON.stringify(posts))
}

const getCurrentMockUser = () => {
  const currentEmail = localStorage.getItem('mockCurrentUserEmail') || 'admin@gmail.com'
  if (currentEmail === 'xavier@gmail.com') {
    return { uuid: 'xavier-001', username: 'Xavier', email: 'xavier@gmail.com' }
  }
  return { uuid: 'admin-001', username: 'Admin', email: 'admin@gmail.com' }
}

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
  if (USE_MOCK_POST_API) {
    const mockPosts = loadMockPosts()
    const response: BasicResponse<Post[]> = {
      code: '200',
      success: true,
      data: mockPosts,
      message: 'Mock posts loaded'
    }
    return [null, response, { headers: {} }]
  }

  try {
    const { data, headers } = await axiosInstance.get<BasicResponse<Post[]>>(`/post/`, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function publishPost(formdata: FormData): Promise<APIResponse<BasicResponse<Boolean>>> {
  if (USE_MOCK_POST_API) {
    const title = String(formdata.get('title') ?? '').trim()
    const content = String(formdata.get('content') ?? '').trim()
    const requestType = Number(formdata.get('request_type') ?? 0)
    const isImportant = String(formdata.get('is_important') ?? 'false') === 'true'
    const redeemPoints = Number(formdata.get('redeemPoints') ?? 0)

    if (!title || !content) {
      const error = new Error('Title and content are required') as Error & { response?: any }
      error.response = {
        status: 400,
        data: {
          message: 'Title and content are required'
        }
      }
      return [error, { code: 400, message: 'Title and content are required' }]
    }

    const posts = loadMockPosts()
    const currentUser = getCurrentMockUser()
    const newPost: Post = {
      id: Date.now(),
      type: 0,
      user: currentUser,
      title,
      content,
      request_type: requestType,
      share_count: 0,
      acceptUser: null,
      paymentMethod: null,
      is_important: isImportant,
      redeemPoints,
      postPhotos: null,
      createTime: new Date().toISOString() as any
    }

    posts.unshift(newPost)
    saveMockPosts(posts)

    const existingUserPosts = JSON.parse(localStorage.getItem('userPosts') || '[]')
    if (Array.isArray(existingUserPosts)) {
      existingUserPosts.unshift(newPost)
      localStorage.setItem('userPosts', JSON.stringify(existingUserPosts))
    }

    const response: BasicResponse<Boolean> = {
      code: '200',
      success: true,
      data: true,
      message: 'Mock post created'
    }
    return [null, response, { headers: {} }]
  }

  try {
    const { data, headers } = await axiosInstance.post<BasicResponse<Boolean>>(`/post/create-post`, formdata, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function likePost(postID: number): Promise<APIResponse<BasicResponse<Boolean>>> {
  if (USE_MOCK_POST_API) {
    const response: BasicResponse<Boolean> = {
      code: '200',
      success: true,
      data: true,
      message: `Mock like success for post ${postID}`
    }
    return [null, response, { headers: {} }]
  }

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