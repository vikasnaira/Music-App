import React from 'react'
import { TbBrandNeteaseMusic } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { RiPlayListFill } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { SiItunes } from "react-icons/si";
import playSound from './SoundClip';
const Sidebar = () => {
  return (
    <div className='md:w-[20%] bg-[#161616] text-[#FE7465] -left-70 min-w-fit absolute md:left-0 md:relative gap-7 py-10 items-start px-10 h-full flex flex-col' >
      {/* for use name or profile */}
      <button className='hover:bg-[#FE7465] md:hidden flex hover:text-black w-fit cursor-pointer py-1 rounded-3xl transition-all  px-4 items-center gap-2 absolute -right-26 top-2 z-9 '><RxHamburgerMenu /></button>
      <div className="logo flex text-[#FE7465] border-1 rounded-2xl overflow-hidden backdrop-blur-2xl  pr-2 w-full h-[10%] items-center justify-between">
      <img src="https://img.freepik.com/free-vector/detailed-podcast-logo-template-with-headphones_23-2148778392.jpg?t=st=1751514645~exp=1751518245~hmac=48947ac211db2521519ee8fd8d617dbc821cf89da899c4e8cd8b48fadcaaf3d7&w=1380" alt="logo" className='h-full' />
        <h1 className='font-serif'>MUSIC APP</h1>
      </div>
      <button className='hover:bg-[#FE7465] hover:text-black w-fit cursor-pointer py-1 rounded-3xl transition-all flex px-4 items-center gap-2' onClick={playSound}><TbBrandNeteaseMusic />Discover</button>
      <button className='hover:bg-[#FE7465] hover:text-black w-fit cursor-pointer py-1 rounded-3xl transition-all flex px-4 items-center gap-2'><SiItunes />iTunes</button>
      <button className='hover:bg-[#FE7465] hover:text-black w-fit cursor-pointer py-1 rounded-3xl transition-all flex px-4 items-center gap-2'><RiPlayListFill />Playlist</button>
      <button className='hover:bg-[#FE7465] hover:text-black w-fit cursor-pointer py-1 rounded-3xl transition-all flex px-4 items-center gap-2'><FaRegHeart />Favriout</button>
      <button className='hover:bg-[#FE7465] hover:text-black w-fit cursor-pointer py-1 rounded-3xl transition-all flex px-4 items-center gap-2'><GoDownload/>Downloads</button>
    </div>
  )
}

export default Sidebar
