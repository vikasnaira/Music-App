import React, { useState } from "react";
import { TbBrandNeteaseMusic } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { RiPlayListFill } from "react-icons/ri";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { SiItunes } from "react-icons/si";
import playSound from "./SoundClip";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden fixed top-3 left-4 z-20 text-2xl  text-white lg:text-[#FE7465]"
        onClick={() => setIsOpen(true)}
      >
        <RxHamburgerMenu />
      </button>

      <div
        className={`fixed top-0 left-0 h-full w-64 justify-center lg:justify-start bg-[#161616] text-[#FE7465] 
        flex flex-col gap-6 py-6 p-5 transition-transform duration-300 z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:relative lg:w-[20%]`}
      >
        {/* Close Button (mobile only) */}
        <button
          className="lg:hidden absolute top-4 right-4 text-xl text-[#FE7465]"
          onClick={() => setIsOpen(false)}
        >
          <RxCross1 />
        </button>

        {/* Logo */}
        <div className="logo flex items-center gap-2 border rounded-xl overflow-hidden p-1 backdrop-blur-md">
          <img
            src="https://img.freepik.com/free-vector/detailed-podcast-logo-template-with-headphones_23-2148778392.jpg?w=1380"
            alt="logo"
            className="h-12 w-12 rounded-md"
          />
          <h1 className="font-serif text-lg">MUSIC APP</h1>
        </div>

        {/* Menu Items */}
        <button
          onClick={playSound}
          className="hover:bg-[#FE7465] hover:text-black py-2 px-4 rounded-2xl flex items-center gap-2"
        >
          <TbBrandNeteaseMusic /> Discover
        </button>
        <button className="hover:bg-[#FE7465] hover:text-black py-2 px-4 rounded-2xl flex items-center gap-2">
          <SiItunes /> iTunes
        </button>
        <button className="hover:bg-[#FE7465] hover:text-black py-2 px-4 rounded-2xl flex items-center gap-2">
          <RiPlayListFill /> Playlist
        </button>
        <button className="hover:bg-[#FE7465] hover:text-black py-2 px-4 rounded-2xl flex items-center gap-2">
          <FaRegHeart /> Favorite
        </button>
        <button className="hover:bg-[#FE7465] hover:text-black py-2 px-4 rounded-2xl flex items-center gap-2">
          <GoDownload /> Downloads
        </button>
      </div>
    </>
  );
};

export default Sidebar;
