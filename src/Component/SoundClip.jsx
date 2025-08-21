// utils/playSound.js

const playSound = () => {
  const audio = new Audio('./sound.wav');
  audio.currentTime = 0;
  audio.play();
};

export default playSound;
