'use client'

import axios from 'axios';
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
      router.push("/dashboard")
    } else {
      alert("Some error occurred")
    }
  };

  return (
    <form onSubmit={handleSubmit} className='w-screen h-screen flex flex-col items-center justify-center gap-5'>
        <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className='text-black p-2 rounded-xl'
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className='text-black p-2 rounded-xl'
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className='text-black p-2 rounded-xl'
      />
      <button type="submit" className='px-10 py-2 rounded-xl bg-blue-900'>Sign Up</button>
      
      <Link href="/auth/signin" className='text-sm text-slate-400'>Already have an account? Sign In!!</Link>
    </form>
  );
}
