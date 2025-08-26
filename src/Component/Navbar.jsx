import { CiSearch, CiSettings } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { FcLikePlaceholder } from "react-icons/fc";
import playSound from './SoundClip';
import {  useRef, useState } from "react";
import Loader from "./Loader";
import { IoRepeat } from "react-icons/io5";

const Navbar = ({setlist , audioUrl , setaudioUrl }) => {

  const [inputData, setinputData] = useState('');
  const audioRef = useRef(null);
  const [loading, setloading] = useState(false)
  const [copyright, setcopyright] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [playTime, setplayTime] = useState()
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


const forDownload = async () => {
  alert("download start")
  try {
    const url = audioUrl ? audioUrl.downloadUrl[4].url : song;
    if (!url) return;

    // Fetch file as blob
    const response = await fetch(url);
    const blob = await response.blob();

    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);


    link.download = `${artist} - ${title}-fromVkMuisic.mp3`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Download failed:", error);
  }
};


   const handleRangeChange = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  
  const fetchData = async () => {
    playSound();
    setaudioUrl("");
    try {
      setloading(true);
      audioRef.current.play();
      const response = await fetch(`https://saavn.dev/api/search/songs?query=${inputData}`);
      setIsPlaying(true);  
      const result = await response.json();
      settitle(result.data.results[0].name);
      setartist(result.data.results[0].artists.primary[0].name);
      setsong(result.data.results[0].downloadUrl[4].url);
      setimgurl(result.data.results[0].image[2].url);
      setcopyright(result.data.results[0].copyright)
      setplayTime(result.data.results[0].playCount)
      // for send relative song for listing  
      setlist(result.data.results);   


      audioRef.current.play();
      setIsPlaying(true);

      
      
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      // setinputData('');
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
    <div className="w-full h-[35%]  md:h-[40%]">
      {/* Navbar */}
      <div className='h-[25%] lg:h-fit w-full lg:bg-[#161616] py-4 bg-gray-500/60 shadow-xs shadow-black lg:py-3 text-[#FE7465] flex items-center justify-end lg:justify-between gap-20 lg:px-10 p-4 lg:gap-10'>
        <div className="sm:flex gap-4 hidden lg:text-red-500 text-black w-[20%] ">
          <button>Home</button>
          <button>Album</button>
        </div>
        <div className="search flex items-center  w-[40] md:relative absolute left-15">
          <input
            type="text"
            className='lg:bg-sky-900/30 h-7 lgtext-red-500 sm:w-20vw lg:w-full w-[50vw] lg:h-8 rounded-l-full bg-black/60 text-white border-1 border-gray-500 px-3'
            placeholder='search...'
            value={inputData}
            onChange={(e) => setinputData(e.target.value)}
          />
          <button
            className="text-2xl lg:bg-[#FE7465] lg:text-[#FE7465] lg:h-8 h-7 px-1 text-black  bg-red-500 cursor-pointer  rounded-r-full"onClick={fetchData}>
            <CiSearch />
          </button>
        </div>
        <div className=" gap-5 sm:flex text-3xl">
          <button className=" hover:rotate-150 hidden sm:flex transition-transform"><CiSettings /></button>
          <button className="hidden sm:flex"><IoIosNotifications /></button>
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60"
            alt="user account"
            className="w-8 h-8  lg:m-0  rounded-full cursor-pointer"
          />
        </div>
      </div>

  


                                  {/* Song Display portion */}

      {loading ? <Loader/>:
      (
      <div className="song lg:h-[41vh] h-screen w-full   flex-col  lg:flex-row text-white font-sans    lg:py-0 flex items-center lg:bg-black/60 ">
        <div className="img flex flex-col lg:flex-row lg:px-10 items-center text-center gap-8 py-3  w-full">   
        <img src={audioUrl? audioUrl.image[2].url : imgurl} alt="song img" className="lg:h-35 h-[40%]  lg:rounded-none rounded-full lg:w-35 [animation-duration:15s]  lg:animate-none animate-spin"/>
        <div className="details flex flex-col gap-2  h-fit w-full  lg:items-start items-center">
          <h3 className="title text-xl lg:text-3xl w-full">{title}</h3>
          <p className="font-extralight  lg:text-lg text-sm text-gray w-full">By {artist} <br /> {copyright} <br />
          playtime {playTime} </p>
        </div>
          <div className="bg-red-500">
          </div>

                      {/* player controlers */}
        </div>
        <div className="text-sm button bottom-1 w-full  px-3 items-center lg:left-0 flex rounded-full bg-gray-500/80 lg:bg-black/60 py-3 h-[15vh]  justify-center lg:justify-start lg:top-10 lg:relative absolute gap-5">
        <img src={audioUrl? audioUrl.image[2].url : imgurl} alt="song img" className=" lg:rounded-full h-full hidden lg:flex  [animation-duration:15s]  animate-spin"/>
          <button className='text-2xl  '><IoRepeat /></button>
        <button
          className="bg-[#e35545] text-black hidden lg:block w-fit lg:h-fit h-14  lg:px-4  lg:py-4 rounded-full"
          onClick={handlePlayPause}>
          {isPlaying ?<FaPause /> : <FaPlay />}
        </button>
        <audio
        ref={audioRef}
        src={audioUrl ? audioUrl.downloadUrl[4].url :song}  
        autoPlay
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)} 
        loop 
        >
        </audio>
        <button className="bg-[#FE7465] text-black lg:h-fit p-3 lg:px-4  lg:py-4 rounded-full">
          <FcLikePlaceholder />
        </button>
          <button
            className="bg-[#FE7465] text-black lg:h-fit p-3 lg:px-4 lg:hidden  lg:py-4 rounded-full"
            onClick={handlePlayPause}>
            {isPlaying ?<FaPause />:<FaPlay />}
          </button>
        <button className="bg-[#FE7465] text-extrabold text-black  p-3 lg:h-fit  lg:p-4 w-fit  flex  rounded-full" onClick={forDownload}>
           <p className="text-[12px] lg:flex hidden" > DOWNLOAD </p><GoDownload />
        </button>
         <input type="range" name="rangeinput" value={currentTime}  id="duration" onChange={handleRangeChange}  step="0.1" min="0" max={duration} className='lg:w-[70%] lg:left-15 w-[70%]  accent-[#FE7465]  absolute md:right-0  lg:bottom-2 bottom-2   z-99 lg:h-[1%] h-[1px] cursor-pointer'/>
        </div>
      </div>)}
    </div>
  );
};

export default Navbar;
