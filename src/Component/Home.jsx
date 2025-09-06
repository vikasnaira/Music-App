import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineQueueMusic } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { IoDiamondOutline } from "react-icons/io5";
const Home = () => {
  return (
    <div className='flex h-[8vh] bottom-[0%] z-29 absolute bg-black/60  font-extralight w-full justify-around items-center lg:hidden text-white text-lg'>
      <button className='flex flex-col  items-center'><IoHomeOutline /><p className='text-xs'>Home</p></button>
      <button className='flex flex-col  items-center'><MdOutlineQueueMusic /><p className='text-xs'>Library</p></button>
      <button className='flex flex-col  items-center'><CiHeart /><p className='text-xs'>Favirout</p></button>
      <button className='flex flex-col  items-center'><IoDiamondOutline /><p className='text-xs'>Pro</p></button>
    </div>
  )
}

export default Home
