import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { users } from '../data'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key'

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNo: string
  dob: string
  gender: string
}

const generateTokens = (userId: number, role: string) => {
  const accessToken = jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '1h' }
  )

  const refreshToken = jwt.sign(
    { userId, role },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  )

  return { accessToken, refreshToken }
}

export const login = async (req: Request, res: Response) : Promise<any> => {
  try {
    const { email, password }: LoginRequest = req.body

    // Find user
    const user = users.find(u => u.email === email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    // Generate tokens
    const tokens = generateTokens(user.id, user.role)

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // Return access token and user data
    return res.json({
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        profileUrl: user.profileUrl
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const register = async (req: Request, res: Response) : Promise<any> => {
  try {
    const userData: RegisterRequest = req.body

    // Check if user exists
    const existingUser = users.find(u => u.email === userData.email)
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10)

    // Create new user (in a real app, this would be a database operation)
    const newUser = {
      id: users.length + 1,
      ...userData,
      password: hashedPassword,
      isVerified: false,
      role: 'USER',
      profileUrl: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}`
    }

    // Generate tokens
    const tokens = generateTokens(newUser.id, newUser.role)

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // Return access token and user data
    return res.status(201).json({
      accessToken: tokens.accessToken,
      user: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        profileUrl: newUser.profileUrl
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export const refreshToken = async (req: Request, res: Response) : Promise<any> => {
  try {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' })
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: number; role: string }
    const user = users.find(u => u.id === decoded.userId)

    if (!user) {
      return res.status(401).json({ message: 'Invalid refresh token' })
    }

    // Generate new tokens
    const tokens = generateTokens(user.id, user.role)

    // Set new refresh token
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })

    // Return new access token
    return res.json({ accessToken: tokens.accessToken })
  } catch (error) {
    return res.status(401).json({ message: 'Invalid refresh token' })
  }
}

export const logout = (req: Request, res: Response) : any => {
  // Clear refresh token cookie
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })

  return res.json({ message: 'Logged out successfully' })
}
