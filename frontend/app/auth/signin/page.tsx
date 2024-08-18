'use client'

import { getSession, signIn, } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import {  useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const router = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault();
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
      const session = await getSession();
      if(session?.user){
        localStorage.setItem("userId",session?.user?.id)
      }
      if (result?.url) {
        router.push(result.url);
      }
    }
  };

  return (
    <div className='flex '>
      <div className='bg-slate-800 w-[40%] hidden sm:flex flex-col gap-10 items-center justify-center text-center text-[40px] text-white font-semibold' > 
        <Link href="/" className='flex items-center justify-center gap-4'>
          <Image src="/icon.png" height={50} width={50} alt='logo' className='rounded-full' />
          <span className="text-2xl font-bold">Shoppie</span>
        </Link>
       <p> Sign In to<br/> Enjoy Shopping </p>
        
    </div>
    <form onSubmit={handleSubmit} className='w-screen h-screen flex flex-col items-center justify-center gap-5 '>
      {error && <p className='text-red-800 text-sm'>{error}</p>}
       <p className='sm:hidden text-center font-semibold'> Sign In to<br/> Enjoy Shopping </p>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className='p-2 rounded-xl  border-2 border-slate-500'
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className='p-2 rounded-xl  border-2 border-slate-500'
      />
      <button type="submit" className='disabled:bg-slate-200  bg-slate-800 px-10 py-2 rounded-xl text-white' disabled={username.length==0 || password.length==0}>Sign In</button>
      <Link href="/auth/signup" className='text-sm text-slate-400'>Don't have an account? Register Now!!</Link>
       <Link href="/" className='text-sm text-slate-400'>Go to Home</Link>
      
      
    </form>
    </div> 
  );
}
