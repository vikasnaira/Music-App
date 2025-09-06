import { IoIosMore } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { GoDownload } from "react-icons/go";


const Song = () => {
  return (
    <div className="h-screen w-full bg-black/90 flex flex-col  lg:rounded-xl">
      <div className="songflex justify-between items-center text-white p-2 w-full">
        <button><MdExpandMore /></button>
        <button><IoIosMore /></button>
      </div>
      <div className="main flex flex-col items-center gap-4 p-4 w-full">
        <img src="" alt="" />
        <h1></h1>
        <p></p>
      </div>
      <div className="controls flex justify-between items-center text-white p-2 w-full">
         <input type="range" name="rangeinput" value={currentTime}  id="duration" onChange={handleRangeChange}  step="0.1" min="0" max={duration} className='w-[70%] left-15 accent-[#FE7465] hidden lg:flex absolute bottom-2  z-9 h-[1%]  cursor-pointer'/>
         <div className="buttons flex justify-between items-center w-full p-4">
            <button
            className="bg-[#FE7465] text-black lg:h-fit p-3 lg:px-4 lg:hidden  lg:py-4 rounded-full"
            onClick={handlePlayPause}>
            {isPlaying ?<FaPause />:<FaPlay />}
          </button>
          <button><CiHeart/></button>
          <button><GoDownload/></button>
         </div>
      </div>
    </div>
  )
}

export default Song
