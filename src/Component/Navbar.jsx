import { CiSearch, CiSettings } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaPlay, FaPause } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { FcLikePlaceholder } from "react-icons/fc";
import playSound from './SoundClip';
import {  useRef, useState } from "react";
import Loader from "./Loader";
import { IoRepeat } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";


const Navbar = ({setlist , audioUrl , setaudioUrl }) => {

  const [inputData, setinputData] = useState('');
  const audioRef = useRef(null);
  const [loading, setloading] = useState(false)
  const [copyright, setcopyright] = useState("")
  const [currentTime, setCurrentTime] = useState(0)
  const [visible, setvisible] = useState(false)
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
  alert("downloading will start in few seconds...")
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
      setvisible(true)
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
    <div className="w-full h-[35%]  md:h-[40%] ">
      {/* Navbar */}
      <div className='h-[10vh] lg:h-fit w-full sticky top-0 lg:bg-[#161616] py-4 bg-gray-500/60 shadow-xs shadow-black lg:py-3 text-[#FE7465] flex   items-center justify-end lg:justify-between gap-20 lg:px-10 p-4 lg:gap-10'>
        <div className="lg:flex gap-4 hidden lg:text-red-500 text-black w-[20%] ">
          <button>Home</button>
          <button>Album</button>
        </div>
        <div className="search flex items-center  w-[40] md:relative absolute left-15">
          <input
            type="text"
            className='lg:bg-sky-900/30 h-7 lg:text-red-500 w-[50vw]  lg:w-full lg:h-8 rounded-l-full bg-black/60 text-white border-1 border-gray-500 px-3'
            placeholder='search...'
            value={inputData}
            onChange={(e) => setinputData(e.target.value)}
          />
          <button
            className="text-2xl lg:bg-[#FE7465] lg:h-8 h-7 px-1 text-black  bg-white cursor-pointer  rounded-r-full"onClick={fetchData}>
            <CiSearch />
          </button>
        </div>
        <div className=" gap-5 flex lg:text-[#FE7465] md:text-black text-3xl">
          <button className=" hover:rotate-150 hidden  md:flex transition-transform"><CiSettings /></button>
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
      <div className="song lg:h-[41vh] h-fit w-full justify-center lg:relative absolute bottom-0 flex-col  lg:flex-row text-white font-sans lg:py-0 flex items-center ">


        {/* Music player for small screen */}

        <div className={`img flex  lg:h-full lg:relative absolute bottom-0 h-[12vh] lg:px-10 bg-black transition-transform duration-300 z-999  lg:bg-transparent items-center text-center lg:gap-8 justify-evenly  gap-2 w-full 
          ${visible? "translate-y-0" : "translate-y-20" }`}>   
          <button className=" lg:hidden flex" onClick={()=>{audioRef.current.pause(), setsong("") , setvisible(false)}} >
             <RxCross1 />
          </button>
        <img src={audioUrl? audioUrl.image[2].url : imgurl} alt="song img" className="lg:h-35 h-13 lg:rounded-none rounded-full lg:w-35 [animation-duration:15s]  lg:animate-none animate-spin"/>
        <div className="details flex flex-col min-w-1/2 overflow-hidden  h-fit items-start">
          <h3 className="title text-[4vw] lg:text-3xl text-nowrap">{title}</h3>
          <p className="text-[3vw] lg:hidden  flex font-light">{artist}</p>
          <p className="font-extralight hidden lg:block lg:text-lg text-sm text-gray w-full">By {artist} <br /> {copyright} <br />
          playtime {playTime} </p>  
        </div>
           <button
            className="bg-white text-black lg:h-fit p-2 lg:px-4 lg:hidden  lg:py-4 rounded-full"
            onClick={handlePlayPause}>
            {isPlaying ?<FaPause />:<FaPlay />}
          </button>
          <button className="text-2xl " onClick={forDownload}><GoDownload /></button>
         <input type="range" name="rangeinput" value={currentTime}  id="duration" onChange={handleRangeChange}  step="0.1" min="0" max={duration} className='custom-range lg:hidden left-0   absolute   w-full  bottom-15  accent-black h-[5px] cursor-pointer'/>
        </div>
        
                      {/* player controlers */}
        <div className="text-sm button bottom-1 lg:flex hidden w-[85%]  px-3 items-center lg:left-0  rounded-full lg:bg-black/60 py-3 h-[15vh]  justify-center lg:justify-start lg:top-10 lg:relative absolute gap-5">
        <img src={audioUrl? audioUrl.image[2].url : imgurl} alt="song img" className=" lg:rounded-full h-full hidden lg:flex  [animation-duration:15s]  animate-spin"/>
          <button className='text-2xl'><IoRepeat /></button>
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
         <input type="range" name="rangeinput" value={currentTime}  id="duration" onChange={handleRangeChange}  step="0.1" min="0" max={duration} className='lg:w-[70%] lg:left-15 w-[70%]  accent-[#FE7465]  absolute md:right-0  lg:bottom-2 bottom-0   z-9 lg:h-[1%] h-[1px] cursor-pointer'/>
        </div>
      </div>)}
    </div>
  );
};

export default Navbar;
