import axios from 'axios';
import type { BasicResponse, loginParams, User } from '~/api/types/common';
import { Storage } from "../utils/storage"

const axiosInstance = axios.create({
  baseURL: "https://mature-jobina-cowball0905-f72ad790.koyeb.app/api"
});

const USE_MOCK_AUTH = true

type MockUser = {
  uuid: string
  username: string
  email: string
  password: string
  house: string
}

const MOCK_USERS: MockUser[] = [
  {
    uuid: 'admin-001',
    username: 'Admin',
    email: 'admin@gmail.com',
    password: 'admin123',
    house: 'Render Demo House'
  },
  {
    uuid: 'xavier-001',
    username: 'Xavier',
    email: 'xavier@gmail.com',
    password: 'xg_c0401',
    house: 'Render Demo House'
  }
]

const MOCK_TOKENS: Record<string, string> = {
  'admin@gmail.com': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20ifQ.mock-signature',
  'xavier@gmail.com': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ4YXZpZXJAZ21haWwuY29tIn0.mock-signature'
}

const getMockTokenForEmail = (email: string) => {
  const lowerEmail = email.toLowerCase()
  if (MOCK_TOKENS[lowerEmail]) {
    return MOCK_TOKENS[lowerEmail]
  }
  return `mock.header.${btoa(lowerEmail).replace(/=/g, '')}`
}

const buildMockError = (status: number, message: string) => {
  const err = new Error(message) as Error & { response?: any }
  err.response = {
    status,
    data: {
      message
    }
  }
  return err
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
  if (USE_MOCK_AUTH) {
    const matchedUser = MOCK_USERS.find(
      user => user.email.toLowerCase() === params.email.trim().toLowerCase() && user.password === params.password
    )

    if (!matchedUser) {
      const error = buildMockError(401, 'Invalid email or password')
      return [error, { code: 401, message: 'Invalid email or password' }]
    }

    const token = getMockTokenForEmail(matchedUser.email)
    localStorage.setItem('mockCurrentUserEmail', matchedUser.email)

    const response: BasicResponse<String> = {
      code: '200',
      success: true,
      data: token,
      message: 'Login success'
    }
    return [null, response, { headers: {} }]
  }

  try {
    const { data, headers } = await axiosInstance.post<BasicResponse<String>>(`/login`, { email: params.email, password: params.password });
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function getUser(): Promise<APIResponse<User>> {
  if (USE_MOCK_AUTH) {
    const currentEmail = localStorage.getItem('mockCurrentUserEmail') || ''
    const token = getToken()

    if (!currentEmail || !token) {
      const error = buildMockError(401, 'Not authenticated')
      return [error, { code: 401, message: 'Not authenticated' }]
    }

    const matchedUser = MOCK_USERS.find(user => user.email === currentEmail)
    if (!matchedUser) {
      const error = buildMockError(401, 'User not found')
      return [error, { code: 401, message: 'User not found' }]
    }

    const user: User = {
      uuid: matchedUser.uuid,
      username: matchedUser.username,
      email: matchedUser.email,
      house: matchedUser.house
    }

    return [null, user, { headers: {} }]
  }

  try {
    const { data, headers } = await axiosInstance.get<User>(`/admin/user`, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}

export async function updateEmail(email: string): Promise<APIResponse<BasicResponse<String>>> {
  if (USE_MOCK_AUTH) {
    const currentEmail = localStorage.getItem('mockCurrentUserEmail') || ''
    const currentUser = MOCK_USERS.find(user => user.email === currentEmail)

    if (!currentUser) {
      const error = buildMockError(401, 'Not authenticated')
      return [error, { code: 401, message: 'Not authenticated' }]
    }

    currentUser.email = email
    localStorage.setItem('mockCurrentUserEmail', email)
    const token = getMockTokenForEmail(email)

    const response: BasicResponse<String> = {
      code: '200',
      success: true,
      data: token,
      message: 'Email updated'
    }

    return [null, response, { headers: {} }]
  }

  try {
    const { data, headers } = await axiosInstance.post<BasicResponse<String>>(`/admin/user/email`, { email }, getConfig());
    return [null, data, { headers }];
  } catch (error: any) {
    console.error(error);
    return [error, error.response?.status];
  }
}