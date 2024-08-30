import Image from 'next/image'
import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const Loading = () => {
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-5'>
        <BiLoaderAlt className=" animate-spin text-5xl text-slate-800" />
        <div className="flex items-center justify-center gap-4">
          <Image src="/icon.png" height={50} width={50} alt="logo" className="rounded-full" />
          <span className="text-2xl font-bold">Shoppie</span>
        </div>
    </div>
  )
}

export default Loading;