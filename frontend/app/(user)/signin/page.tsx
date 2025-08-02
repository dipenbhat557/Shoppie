'use client'

import { FcGoogle } from 'react-icons/fc'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Footer } from '@/components/Footer'
import axiosInstance from '@/lib/axios'
import { toast } from 'sonner'

// Custom Input Component
const CustomInput = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  className = '',
  ...props 
}: {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  [key: string]: any
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#E73C17] focus:border-transparent transition-colors ${className}`}
      {...props}
    />
  )
}

// Custom Button Component
const CustomButton = ({ 
  type = 'button', 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}: {
  type?: 'button' | 'submit'
  variant?: 'primary' | 'outline'
  children: React.ReactNode
  className?: string
  [key: string]: any
}) => {
  const baseStyles = 'px-4 py-2 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-[#E73C17] hover:bg-[#d63615] text-white focus:ring-[#E73C17]',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500'
  }
  
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function SignInPage() {
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    password: ''
  })
  
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)

    const response = await axiosInstance.post('/auth/login', formData)
    console.log(response)

    if(response.status !== 200){
      toast.error("Login Failed")
    }

    localStorage.setItem('accessToken', response.data.accessToken)
    router.push("/dashboard")
  }
  
  return (
    <div className="min-h-screen flex flex-col">

      
      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Log in to Kinamna</h2>
            <p className="mt-2 text-sm text-gray-600">Enter your details below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <CustomInput
                type="text"
                placeholder="Email or Phone Number"
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
              />
              <CustomInput
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end">
              <Link href="/forgot-password" aria-disabled className="text-sm text-[#E73C17] hover:underline">
                Forget Password?
              </Link>
            </div>
            
            <CustomButton type="submit" className="w-full">
              Log In
            </CustomButton>
            
            <CustomButton
              type="button"
              variant="outline"
              disabled={true}
              className="w-full flex items-center justify-center gap-2"
            >
              <FcGoogle />
              Sign in with Google
            </CustomButton>
            
            <p className="text-center text-sm text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/register" aria-disabled className="text-[#E73C17] hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}