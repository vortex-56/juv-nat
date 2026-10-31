import { useState, useRef, MouseEvent } from "react";
import { Play, Pause, Maximize, CirclePlay } from "lucide-react";

export default function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const togglePlay = () => {
    if (isPlaying) {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // If video file has not yet been loaded or is placeholder, state still toggles gracefully
        });
      }
    }
  };

  const handleFullscreen = (e: MouseEvent) => {
    e.stopPropagation();
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      } else {
        containerRef.current.requestFullscreen().catch(() => {
          // Fallback to video element fullscreen on iOS / Safari
          if (videoRef.current && (videoRef.current as any).webkitEnterFullscreen) {
            (videoRef.current as any).webkitEnterFullscreen();
          }
        });
      }
    }
  };

  return (
    <section id="video" className="py-8 sm:py-10 bg-[#6c1323] text-white border-b border-[#fab511]/20 scroll-mt-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          
          {/* Columna Izquierda: Textos ajustados al ancho del título (centrado en mobile, a la izquierda en desktop) */}
          <div className="w-full lg:w-auto max-w-[420px] space-y-3.5 text-center lg:text-left shrink-0 flex flex-col items-center lg:items-start">
            <div className="w-full">
              <p className="text-xs sm:text-sm font-extrabold tracking-wider text-red-200 uppercase mb-1.5">
                Conoce más de
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-[900] text-white tracking-tight leading-tight whitespace-nowrap drop-shadow-md">
                TRANSPORTE <span className="text-[#fab511]">JUVASA</span>
              </h2>
            </div>

            <p className="text-red-100 font-sans text-base sm:text-lg leading-snug font-semibold max-w-[390px] mx-auto lg:mx-0 drop-shadow-xs">
              Movilidades modernas, atención profesional y confianza en cada servicio.
            </p>

            <div className="pt-2 flex justify-center lg:justify-start w-full">
              <button
                type="button"
                onClick={togglePlay}
                className="inline-flex items-center gap-2.5 bg-[#fab511] hover:bg-[#e0a20e] text-[#6c1323] font-[900] px-7 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 text-sm sm:text-base uppercase tracking-wider group cursor-pointer active:scale-95"
              >
                <CirclePlay className="w-5 h-5 shrink-0 stroke-[2.5]" />
                <span>{isPlaying ? "Pausar video" : "Ver ahora"}</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Video 1:1 (cuadrado) cerca del texto */}
          <div className="w-full flex justify-center lg:justify-start lg:w-auto">
            <div
              ref={containerRef}
              className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[430px] aspect-square rounded-2xl bg-black border-4 border-white/20 overflow-hidden shadow-2xl group cursor-pointer"
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05c040d6e2e50529d10d6e67e3a92b9&profile_id=139&oauth2_token_id=57447761"
                poster="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-portada.webp"
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Botón de reproducción central con amarillo corporativo */}
              <div
                className={`absolute inset-0 bg-black/30 transition-opacity flex items-center justify-center ${
                  isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fab511] text-[#6c1323] flex items-center justify-center shadow-2xl transform scale-95 group-hover:scale-105 transition-all duration-300">
                  {isPlaying ? (
                    <Pause className="w-8 h-8 fill-[#6c1323]" />
                  ) : (
                    <Play className="w-8 h-8 fill-[#6c1323] ml-1" />
                  )}
                </div>
              </div>

              {/* Botón maximizar / pantalla completa */}
              <button
                type="button"
                onClick={handleFullscreen}
                className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-xl border border-white/20 shadow-lg transition-colors cursor-pointer z-10"
                title="Pantalla completa"
                aria-label="Pantalla completa"
              >
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-[#fab511]" />
              </button>

              {/* Etiqueta inferior del video */}
              <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-xl text-xs text-white font-sans font-semibold pointer-events-none">
                Transporte JUVASA · Lima & Cobertura
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
