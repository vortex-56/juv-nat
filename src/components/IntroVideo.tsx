import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";

export default function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Title Group */}
        <div className="mb-6 space-y-1.5">
          <span className="text-brand-red text-xs font-bold uppercase tracking-widest block">
            CONOCE NUESTRA EXPERIENCIA EN MOVIMIENTO
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-extrabold text-brand-dark tracking-tight">
            Viajes Seguros, Confortables y Puntuales en Cada Ruta
          </h2>
          <div className="w-12 h-1 bg-brand-yellow mx-auto rounded-full mt-2"></div>
        </div>

        {/* Video Player Frame with elegant shadow and rounded border */}
        <div className="relative w-full aspect-video rounded-2xl bg-black border-4 border-brand-red/10 overflow-hidden shadow-xl max-w-3xl mx-auto group">
          <video
            ref={videoRef}
            src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05c040d6e2e50529d10d6e67e3a92b9&profile_id=139&oauth2_token_id=57447761"
            poster="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/bg04bus.webp"
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
          />

          {/* Central Play/Pause Toggle */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 bg-black/20 hover:bg-black/35 flex items-center justify-center transition-colors focus:outline-none"
            aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
          >
            <div className="w-14 h-14 rounded-full bg-brand-yellow/95 hover:bg-brand-yellow text-brand-red-dark flex items-center justify-center shadow-lg transform scale-95 group-hover:scale-100 transition-all duration-300">
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-brand-red-dark" />
              ) : (
                <Play className="w-6 h-6 fill-brand-red-dark ml-0.5" />
              )}
            </div>
          </button>

          {/* Video tag overlay */}
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm border border-white/10 px-2.5 py-1 rounded text-[10px] text-white font-mono">
            Juvasa Transporte Nacional
          </div>
        </div>
      </div>
    </section>
  );
}
