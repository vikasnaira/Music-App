import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Player from './Player'
import { useState } from 'react'

const Music = () => { 
  const [list, setlist] = useState([]); // list of relative songs
  const [trfsong, settrfsong] = useState(""); // current playing song url
  const [visible, setvisible] = useState(false)
  console.log(trfsong);
  
  return (
    <div className='main h-full  overflow-hidden relative justify-between w-full flex backdrop-blur-sm lg:backdrop-blur-lg'>
      <Sidebar/>
      <div className='main flex-col flex h-full w-[100%]'>
        {/* Pass song list and setter */}
        <Navbar audioUrl={trfsong} setlist={setlist} setvisible={setvisible} visible={visible} onClick={onclick} setaudioUrl={settrfsong} />
        <Player msg={list} settrfsong={settrfsong} setvisible={setvisible} />
      </div>
    </div>
  )
}

export default Music
