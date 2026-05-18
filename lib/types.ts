export interface User {
  id: string
  username: string
  displayName: string
  avatar: string
  bio: string
  verified: boolean
  followers: number
  following: number
  postsCount: number
  isOnline?: boolean
}

export interface Post {
  id: string
  author: User
  content: string
  images?: string[]
  createdAt: string
  reactions: {
    rocket: number
    bullish: number
    bearish: number
    diamond: number
    fire: number
  }
  userReaction?: keyof Post['reactions'] | null
  commentsCount: number
  shares: number
  saved: boolean
  type: 'text' | 'image' | 'signal' | 'poll'
  signal?: {
    ticker: string
    action: 'buy' | 'sell' | 'hold'
    entry: number
    target: number
    stopLoss: number
  }
}

export interface Comment {
  id: string
  author: User
  content: string
  createdAt: string
  likes: number
  liked: boolean
  replies?: Comment[]
}

export interface Product {
  id: string
  seller: User
  title: string
  description: string
  longDescription: string
  price: number
  category: 'signals' | 'strategies' | 'courses' | 'tools'
  image: string
  rating: number
  reviewsCount: number
  sales: number
  tags: string[]
  performance?: {
    winRate: number
    avgReturn: number
    totalTrades: number
  }
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Message {
  id: string
  senderId: string
  content: string
  timestamp: string
  read: boolean
}

export interface Conversation {
  id: string
  participant: User
  lastMessage: Message
  unreadCount: number
}

export type ReactionType = 'rocket' | 'bullish' | 'bearish' | 'diamond' | 'fire'

export type FeedFilter = 'all' | 'following' | 'trending' | 'signals'

export type MarketplaceCategory = 'all' | 'signals' | 'strategies' | 'courses' | 'tools'

export type MarketplaceSort = 'popular' | 'newest' | 'price-low' | 'price-high' | 'rating'
