import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Player from './Player'
import { useState } from 'react'

const Music = () => { 
  const [list, setlist] = useState([]);
  const [trfsong, settrfsong] = useState(""); // current playing song url

  return (
    <div className='main h-full w-full overflow-hidden relative justify-between flex backdrop-blur-lg'>
      <Sidebar/>
      <div className='main flex-col flex h-full w-[80%]'>
        {/* Pass song list and setter */}
        <Navbar audioUrl={trfsong} setlist={setlist} onClick={onclick} />
        <Player msg={list} settrfsong={settrfsong} />
      </div>
    </div>
  )
}

export default Music
