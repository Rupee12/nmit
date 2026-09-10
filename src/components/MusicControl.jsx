import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicControl({ enabled }) {
  const audio = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!enabled || !audio.current) return;

    const startMusic = async () => {
      try {
        audio.current.volume = 0.35;
        await audio.current.play();
        setIsPlaying(true);
      } catch (error) {
        // Browser blocked autoplay.
        // User can start it using the button.
        setIsPlaying(false);
      }
    };

    startMusic();
  }, [enabled]);

  const toggleMusic = async () => {
    if (!audio.current) return;

    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.current.play();
        setIsPlaying(true);
      } catch (error) {
        setIsPlaying(false);
      }
    }
  };

  if (!enabled) return null;

  return (
    <>
      <audio
        ref={audio}
        loop
        preload="auto"
        src="/audio/teachers-day.mp3"
      />

      <button
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute music' : 'Play music'}
        className="focus-ring fixed right-5 top-5 z-50 glass rounded-full p-3 text-[#d9b76c] hover:bg-white/10 transition-all duration-300"
      >
        {isPlaying ? (
          <Volume2 size={18} />
        ) : (
          <VolumeX size={18} />
        )}
      </button>
    </>
  );
}
