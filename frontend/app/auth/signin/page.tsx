'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import {  useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    console.log("clicked")
    setError('');
    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
      callbackUrl,
    });
    if (result?.error) {
      setError(result.error);
      console.error(result.error);
    } else {
       window.location.href = result?.url || callbackUrl;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-screen h-screen flex flex-col items-center justify-center gap-5'>
      {error && <p className='text-red-800 text-sm'>{error}</p>}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className='p-2 rounded-xl text-black'
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className='p-2 rounded-xl text-black'
      />
      <button type="submit" className='bg-blue-800 px-10 py-2 rounded-xl'>Sign In</button>
      <Link href="/auth/signup" className='text-sm text-slate-400'>Don't have an account? Register Now!!</Link>
      
    </form>
  );
}
