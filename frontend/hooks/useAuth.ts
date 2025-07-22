// frontend/hooks/useAuth.ts
import { useContext } from 'react'
import { AuthContext } from '@/providers/AuthProvider'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  role: string
  profileUrl: string
}

export interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  phoneNo: string
  dob: string
  gender: string
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}
