'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useState } from 'react'
import { Topbar } from '../../components/Topbar'
import Navbar from '../../components/Navbar'
import { Footer } from '../../components/Footer'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full flex flex-col gap-5  ">
          <Topbar />
          <Navbar />
        </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">Create an account</h2>
            <p className="mt-2 text-sm text-gray-600">Enter your details below</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2"
              />
              <Input
                type="text"
                placeholder="Email or Phone Number"
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                className="w-full px-3 py-2"
              />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-3 py-2"
              />
            </div>

            <Button type="submit" className="w-full bg-[#E73C17] hover:bg-[#d63615] text-white py-2 rounded-md">
              Create Account
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full py-2 flex items-center justify-center gap-2 border rounded-md"
            >
              <Image src="/google.svg" alt="Google" width={20} height={20} />
              Sign up with Google
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have account?{' '}
              <Link href="/signin" className="text-[#E73C17] hover:underline">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
