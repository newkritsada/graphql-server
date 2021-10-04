import { JwtPayload } from 'jsonwebtoken'

export interface GenerateToken {
  userId: string
  username: string
}

export interface TokenPayload extends JwtPayload, GenerateToken {
  tokenType: string
}
