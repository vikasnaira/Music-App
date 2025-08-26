import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Player from './Player'
import { useState } from 'react'

const Music = () => { 
  const [list, setlist] = useState([]);
  const [trfsong, settrfsong] = useState(""); // current playing song url

  return (
    <div className='main h-full relative justify-between w-full flex backdrop-blur-sm lg:backdrop-blur-lg'>
      <Sidebar/>
      <div className='main flex-col flex h-full w-[100%]'>
        {/* Pass song list and setter */}
        <Navbar audioUrl={trfsong} setlist={setlist} onClick={onclick} setaudioUrl={settrfsong} />
        <Player msg={list} settrfsong={settrfsong} />
      </div>
    </div>
  )
}

export default Music
