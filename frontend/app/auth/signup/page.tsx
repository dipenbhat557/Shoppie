'use client'

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignUp() {
  const [name,setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    

    const res = await axios.post(
        '/api/auth/signup',
        {
            name:name,
            username:username,
            password:password
        },
        {
            headers: {
                'Content-Type': 'application/json',     
            }
        }
    )

    if (res.status==200) {
      alert("Registered successfully")
      router.push("/")
    } else {
      alert("Some error occurred")
    }
  };

  return (
  <div className='flex '>
      <div className='bg-orange-500 w-[40%] hidden sm:flex flex-col gap-10 items-center justify-center text-center text-[40px] text-white font-semibold' > 
        <Link href="/" className='flex items-center justify-center gap-4'>
          <Image src="/icon.svg" height={50} width={50} alt='logo' className='rounded-full' />
          <span className="text-2xl font-bold">Shoppie</span>
        </Link>
       <p> Register to<br/> Enjoy Shopping </p>
        
    </div>
    <form onSubmit={handleSubmit} className='w-screen h-screen flex flex-col items-center justify-center gap-5'>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className='p-2 rounded-xl  border-2 border-slate-500'
      />
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
      <button type="submit" className='px-10 py-2 rounded-xl bg-orange-500'>Sign Up</button>
      
      <Link href="/auth/signin" className='text-sm text-slate-400'>Already have an account? Sign In!!</Link>
        <Link href="/" className='text-sm text-slate-400'>Go to Home</Link>
      
    </form>
    </div>
  );
}
