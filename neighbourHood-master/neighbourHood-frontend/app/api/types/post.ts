export interface Post {
  id: number
  type: number
  user?: PostUser
  title: string
  content: string
  request_type: number
  // likeUsers?: Array<PostUser>
  share_count: number
  acceptUser?: PostUser | null
  paymentMethod?: number | null
  is_important: boolean
  redeemPoints: number
  postPhotos?: Array<postPhoto> | null
  startTime?: Date
  endTime?: Date
  createTime?: Date
}

export interface PostRequest {
  type: number
  title: string
  content: string
  request_type: number
  paymentMethod?: number
  is_important: boolean
  redeemPoints: number
  time: Date[]
}

export interface postPhoto {
  id: string
  url: string
  createTime: Date
}

export interface PostUser {
  uuid: string
  username: string
  email?: string
}