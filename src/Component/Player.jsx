import { FaPlay } from "react-icons/fa";
import playSound from "./SoundClip";

const Player = ({ msg, settrfsong ,setvisible , visible}) => {
  if (!msg || msg.length === 0)
    return (
      <div className="bg-black/90 lg:absolut  bottom-0  hidden lg:flex h-[50vh] w-full  items-center rounded-xl justify-center lg:text-5xl text-amber-50">
        No songs found
      </div>
    );

  return (
    <div className="myDiv lg:bg-black/60 h-[90vh] bg-white md:p-2 p-2 w-full lg:w-[82%] top-12  lg:block  fixed z-0 lg:top-[50%] lg:rounded-xl lg:h-1/2 md:bottom-0 text-white overflow-y-scroll">
      <h2 className="text-xl lg:sticky lg:-top-2 z-99 -top-1 bg-black-60 lg:bg-black">Relative Results</h2>
      <ul className="space-y-3">
        {msg.map((song, index) => (
          <li
            key={song.id || index}
            className="flex items-center w-full  text-[10px] gap-1 lg:gap-4 lg:p-2 py-1 px-2 lg:bg-[#161616] cursor-pointer rounded-lg"
          >
            <img
              src={song.image?.[1]?.url}
              alt={song.name}
              className="w-12 h-12 rounded" 
            />
            <div className="flex-10">
              <p className="font-bold text-black lg:text-white">{song.name}</p>
              <p className="text-[8px] text-gray-400">
                {song.artists?.primary[0]?.name}
              </p>
            </div>
            <div className="flex w-[30%] justify-between gap-10">
              <p className="lg:flex hidden">
                {Math.floor(song.duration / 60)}.{song.duration % 60}s
              </p>
              <p className="text-sm lg:flex  hidden">{song.playCount} Plays</p>
            </div>
            <button
              className="bg-black p-3 text-white rounded-full"
              onClick={() => {
                settrfsong(song);
                playSound();
                setvisible(true)
              }}
            >
              <FaPlay />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Player;
