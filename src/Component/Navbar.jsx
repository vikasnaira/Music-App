import { CiSearch, CiSettings } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { FcLikePlaceholder } from "react-icons/fc";
import playSound from './SoundClip';
import {  useRef, useState } from "react";
import Loader from "./Loader";
import { GiTrumpet } from "react-icons/gi";

const Navbar = ({setlist , audioUrl }) => {

console.log("audioUrl", audioUrl);


  const [inputData, setinputData] = useState('');
  const audioRef = useRef(null);
  const [loading, setloading] = useState(false)
  const [copyright, setcopyright] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  // const [list, setlist] = useState([])
  const [duration, setDuration] = useState(0);
  const [song, setsong] = useState('');
  const [title, settitle] = useState('shaiyaran')
  const [artist, setartist] = useState('Arijit singh ')
  const [imgurl, setimgurl] = useState("https://c.saavncdn.com/598/Saiyaara-Hindi-2025-20250703061754-500x500.jpg");
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };  
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

   const handleRangeChange = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  
  const fetchData = async () => {
    setloading(true);
    try {
      audioUrl = ""
      audioRef.current.play();
      setIsPlaying(true);  
      playSound();
      const response = await fetch(`https://saavn.dev/api/search/songs?query=${inputData}`);
      const result = await response.json();
      settitle(result.data.results[0].name);
      setartist(result.data.results[0].artists.primary[0].name);
      setsong(result.data.results[0].downloadUrl[4].url);
      setimgurl(result.data.results[0].image[2].url);
      setcopyright(result.data.results[0].copyright)

      // for send relative song for listing  
      setlist(result.data.results);
      console.log(list);
    
      setTimeout(() => {
        audioRef.current.play();
        setIsPlaying(false);
      }, 200);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setinputData('');
      setloading(false)
    }
  };

  const handlePlayPause = () => {
    playSound();
    setDuration(audioRef.current.duration);
    if (!song) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="w-full h-[40%]">
      {/* Navbar */}
      <div className='h-[20%] w-full bg-[#161616] text-[#FE7465] flex items-center justify-between px-10 gap-10'>
        <div className="flex gap-5">
          <button>Home</button>
          <button>Album</button>
        </div>
        <div className="search flex items-center gap-3">
          <input
            type="text"
            className='bg-sky-900/30 rounded-full border-1 py-1 px-3 w-full'
            placeholder='search song here'
            value={inputData}
            onChange={(e) => setinputData(e.target.value)}
          />
          <button
            className="text-2xl bg-[#FE7465] cursor-pointer text-black p-1 rounded-full"
            onClick={fetchData}
          >
            <CiSearch />
          </button>
        </div>
        <div className="flex gap-5">
          <button className="text-2xl hover:rotate-150 transition-transform"><CiSettings /></button>
          <button><IoIosNotifications /></button>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60"
            alt="user account"
            className="w-8 h-8 rounded-full cursor-pointer"
          />
        </div>
      </div>


                                  {/* Song Display portion */}

      {loading ? <Loader/>:
      (
      <div className="song min-h-[30%]   text-white font-sans px-20 py-4 flex items-center gap-10">

        <img src={audioUrl? audioUrl.image[2].url : imgurl} alt="song img" className="h-full w-35" />
        <div>
          <h1 className="title text-[2vw] py-4">{title}</h1>
          <p className="font-extralight text-sm text-gray">By {artist} <br /> {copyright} </p>
        </div>

        <div className="relative button h-full w-fit flex gap-10">
        <button
          className="bg-[#FE7465] text-black py-4 px-4 rounded-full"
          onClick={handlePlayPause}
        >
          {isPlaying ?<FaPause /> : <FaPlay />}
        </button>
        <audio
        ref={audioRef}
        src={audioUrl ? audioUrl.downloadUrl[4].url :song}  
        autoPlay
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        >
        </audio>
        <button className="bg-[#FE7465] text-black py-4 px-4 rounded-full">
          <FcLikePlaceholder />
        </button>
        <button className="bg-[#FE7465] text-black py-2 text-sm rounded-full">
          <a href={song} download className="flex items-center gap-2 px-4">
            DOWNLOAD <GoDownload />
          </a>
        </button>
        <input type="range" name="rangeinput" value={currentTime}  id="duration" onChange={handleRangeChange}  step="0.1" min="0" max={duration} className='w-full   accent-[#FE7465]  absolute right-0 -bottom-10  z-99 h-1 cursor-pointer'/>
        </div>
      </div>)}
    </div>
  );
};

export default Navbar;
