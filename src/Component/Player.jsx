import { FaPlay } from "react-icons/fa";
import playSound from "./SoundClip";

const Player = ({ msg, settrfsong , onClick}) => {
  if (!msg || msg.length === 0)
    return (
      <div className="bg-black/60 h-full flex items-center justify-center text-5xl text-amber-50">
        No songs found
      </div>
    );

  return (
    <div className="myDiv p-5 w-full relative h-full bg-black text-white overflow-y-scroll">
      <h2 className="text-xl sticky -top-5 bg-black z-1">Search Results</h2>
      <ul className="space-y-3">
        {msg.map((song, index) => (
          <li
            key={song.id || index}
            className="flex items-center gap-4 p-2 bg-[#161616] cursor-pointer rounded-lg"
          >
            <img
              src={song.image?.[1]?.url}
              alt={song.name}
              className="w-12 h-12 rounded"
            />
            <div className="flex-1">
              <p className="font-bold">{song.name}</p>
              <p className="text-sm text-gray-400">
                {song.artists?.primary[0]?.name}
              </p>
            </div>
            <div className="flex w-[30%] justify-between gap-10">
              <p>
                {Math.floor(song.duration / 60)}.{song.duration % 60}s
              </p>
              <p className="text-sm">{song.playCount} Plays</p>
            </div>
            <button
              className="bg-[#FE7465] p-3 text-white rounded-full"
              onClick={() => {
                settrfsong(song);
                playSound();
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
