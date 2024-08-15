import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='w-full h-[300px] sm:h-[450px] bg-orange-500 bg-opacity-90 flex items-center justify-around'>
        <div className=' hidden sm:flex w-[60%] h-[50%]'>
            <Image src="/images/hero.png" alt="hero" width={100} height={100} className="w-full h-full object-contain"/>
        </div>
        <div className= 'w-[80%] sm:w-[30%] h-[50%] flex flex-col items-center text-center sm:text-left justify-center text-white font-semibold text-[30px] sm:text-[40px]'>
            <p>Get Whatever You Want</p>
            <p>In Just a Single Click</p>
        </div>
    </div>
  )
}

export default Hero