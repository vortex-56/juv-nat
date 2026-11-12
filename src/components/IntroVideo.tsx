import { useState, useRef, useEffect, MouseEvent } from "react";
import { 
  Play, 
  Pause, 
  Maximize, 
  Minimize2, 
  CirclePlay, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  X 
} from "lucide-react";

export default function IntroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reiniciar temporizador para ocultar controles en modo maximizado tras inactividad (2.5s)
  const kickControlsTimer = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    hideControlsTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 2500);
  };

  // Alternar reproducción / pausa
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
      if (isMaximized) kickControlsTimer();
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowControls(true);
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    }
  };

  // Tocar o dar clic en el video pausa o continúa
  const handleVideoClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (isMaximized) {
      // En maximizado, si los controles estaban ocultos, el primer tap solo los muestra
      if (!showControls) {
        kickControlsTimer();
        return;
      }
      togglePlay();
      kickControlsTimer();
    } else {
      togglePlay();
    }
  };

  // Avanzar o retroceder segundos
  const handleSkip = (seconds: number, e?: MouseEvent) => {
    if (e) e.stopPropagation();
    if (videoRef.current) {
      const targetTime = videoRef.current.currentTime + seconds;
      videoRef.current.currentTime = Math.max(0, Math.min(targetTime, videoRef.current.duration || 0));
      setCurrentTime(videoRef.current.currentTime);
      if (isMaximized) kickControlsTimer();
    }
  };

  // Maximizar 1:1
  const handleMaximize = (e: MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(true);
    kickControlsTimer();
    if (videoRef.current && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Volver a hacer pequeño el video
  const handleMinimize = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setIsMaximized(false);
    setShowControls(true);
    if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
  };

  // Alternar audio
  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (isMaximized) kickControlsTimer();
    }
  };

  // Control deslizante de tiempo
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
      if (isMaximized) kickControlsTimer();
    }
  };

  // Formatear segundos en mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return "0:00";
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  };

  // Si alguien reprodujo el video y sube o baja de la sección, el video se detiene
  useEffect(() => {
    const targetElement = sectionRef.current;
    if (!targetElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !isMaximized) {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(targetElement);

    return () => {
      observer.disconnect();
    };
  }, [isMaximized]);

  // Cerrar con Escape y atajos cuando está maximizado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isMaximized) return;
      if (e.key === "Escape") {
        setIsMaximized(false);
        setShowControls(true);
      } else if (e.key === " ") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handleSkip(-5);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleSkip(5);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMaximized, isPlaying]);

  // Manejar movimiento de mouse o toque en maximizado
  const handleActivityMaximized = () => {
    kickControlsTimer();
  };

  return (
    <section
      id="video"
      ref={sectionRef}
      className="py-8 sm:py-10 bg-[#6c1323] text-white border-b border-[#fab511]/20 scroll-mt-10"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-12">
          
          {/* Columna Izquierda: Textos */}
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

            {/* Botón Ver ahora / Pausar video */}
            <div className="pt-2 flex justify-center lg:justify-start w-full">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pausar video Transporte JUVASA" : "Ver video de Transporte JUVASA"}
                className="inline-flex items-center gap-2.5 bg-[#fab511] hover:bg-[#e0a20e] text-[#6c1323] font-[900] px-7 py-3 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 text-sm sm:text-base uppercase tracking-wider group cursor-pointer active:scale-95"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 shrink-0 fill-[#6c1323]" aria-hidden="true" />
                    <span>Pausar video</span>
                  </>
                ) : (
                  <>
                    <CirclePlay className="w-5 h-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                    <span>Ver ahora</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Columna Derecha: Video 1:1 */}
          <div className="w-full flex justify-center lg:justify-start lg:w-auto">
            {/* Espacio reservado para evitar saltos en la grilla */}
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] lg:max-w-[430px] aspect-square">
              
              {/* Contenedor del video: relativo si normal, fixed de pantalla completa si maximizado */}
              <div
                className={
                  isMaximized
                    ? "fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
                    : "relative w-full h-full aspect-square rounded-2xl bg-black border-4 border-white/20 overflow-hidden shadow-2xl group cursor-pointer"
                }
                onMouseMove={isMaximized ? handleActivityMaximized : undefined}
                onTouchStart={isMaximized ? handleActivityMaximized : undefined}
                onClick={isMaximized ? handleVideoClick : undefined}
              >
                
                {/* Cuadro del video estrictamente 1:1 (cuadrado) en su tamaño máximo disponible */}
                <div
                  className={
                    isMaximized
                      ? "relative w-[min(88vw,88vh)] h-[min(88vw,88vh)] max-w-[700px] max-h-[700px] aspect-square bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-white/25 flex items-center justify-center"
                      : "w-full h-full relative"
                  }
                  onClick={!isMaximized ? handleVideoClick : undefined}
                >
                  <video
                    ref={videoRef}
                    preload="none"
                    src="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/ejem01.mp4"
                    poster="https://raw.githubusercontent.com/vortex-56/juv-nat-2/main/00-portada.webp"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loop
                    playsInline
                    muted={isMuted}
                    onTimeUpdate={() => {
                      if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                    }}
                    onLoadedMetadata={() => {
                      if (videoRef.current) {
                        setDuration(videoRef.current.duration);
                        setIsMuted(videoRef.current.muted);
                      }
                    }}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Botón central de reproducción (visible en pausa o hover) */}
                  <div
                    className={`absolute inset-0 bg-black/35 transition-opacity flex items-center justify-center pointer-events-none ${
                      isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                    }`}
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#fab511] text-[#6c1323] flex items-center justify-center shadow-2xl transform scale-95 group-hover:scale-105 transition-all duration-300">
                      {isPlaying ? (
                        <Pause className="w-8 h-8 fill-[#6c1323]" aria-hidden="true" />
                      ) : (
                        <Play className="w-8 h-8 fill-[#6c1323] ml-1" aria-hidden="true" />
                      )}
                    </div>
                  </div>

                  {/* Modo normal: Botón maximizar en la esquina superior derecha */}
                  {!isMaximized && (
                    <button
                      type="button"
                      onClick={handleMaximize}
                      className="absolute top-3 right-3 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-xl border border-white/20 shadow-lg transition-all hover:scale-105 cursor-pointer z-10"
                      title="Agrandar video 1:1"
                      aria-label="Agrandar video 1:1"
                    >
                      <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-[#fab511]" aria-hidden="true" />
                    </button>
                  )}

                  {/* Modo Maximizado: Barra de controles flotante sobre el video */}
                  {isMaximized && (
                    <div
                      className={`absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent transition-opacity duration-300 flex flex-col gap-2.5 z-20 ${
                        showControls ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Barra de progreso / Scrubbing */}
                      <div className="flex items-center gap-2 text-[11px] sm:text-xs text-white/90 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <input
                          type="range"
                          min="0"
                          max={duration || 100}
                          step="0.1"
                          value={currentTime}
                          onChange={handleSeek}
                          aria-label="Línea de tiempo del video"
                          className="flex-1 h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-[#fab511]"
                        />
                        <span>{formatTime(duration)}</span>
                      </div>

                      {/* Controles: Retroceder -5s, Play/Pausa, Avanzar +5s, Audio y Minimizar */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        
                        {/* Audio */}
                        <button
                          type="button"
                          onClick={toggleMute}
                          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                          title={isMuted ? "Activar audio" : "Silenciar"}
                          aria-label={isMuted ? "Activar audio" : "Silenciar"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-4 h-4 text-red-300" aria-hidden="true" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
                          )}
                        </button>

                        {/* Centro: -5s, Play/Pause, +5s */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          {/* Retroceder -5 segundos */}
                          <button
                            type="button"
                            onClick={(e) => handleSkip(-5, e)}
                            className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold text-xs uppercase transition-all active:scale-95 cursor-pointer border border-white/10"
                            title="Retroceder 5 segundos"
                            aria-label="Retroceder 5 segundos"
                          >
                            <RotateCcw className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
                            <span>-5s</span>
                          </button>

                          {/* Detener / Continuar (Play / Pause) */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlay();
                            }}
                            className="w-12 h-12 rounded-full bg-[#fab511] hover:bg-[#e0a20e] text-[#6c1323] flex items-center justify-center shadow-lg transition-all active:scale-90 cursor-pointer"
                            title={isPlaying ? "Detener video" : "Continuar video"}
                            aria-label={isPlaying ? "Detener video" : "Continuar video"}
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 fill-[#6c1323]" aria-hidden="true" />
                            ) : (
                              <Play className="w-6 h-6 fill-[#6c1323] ml-0.5" aria-hidden="true" />
                            )}
                          </button>

                          {/* Avanzar +5 segundos */}
                          <button
                            type="button"
                            onClick={(e) => handleSkip(5, e)}
                            className="flex items-center gap-1 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white font-bold text-xs uppercase transition-all active:scale-95 cursor-pointer border border-white/10"
                            title="Avanzar 5 segundos"
                            aria-label="Avanzar 5 segundos"
                          >
                            <span>+5s</span>
                            <RotateCw className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
                          </button>
                        </div>

                        {/* Botón volver a hacer pequeño el video */}
                        <button
                          type="button"
                          onClick={handleMinimize}
                          className="flex items-center gap-1 px-2.5 sm:px-3 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-white text-xs font-bold transition-colors cursor-pointer border border-white/10"
                          title="Volver a hacer pequeño el video (Esc)"
                          aria-label="Minimizar video y volver al tamaño normal"
                        >
                          <Minimize2 className="w-4 h-4 text-[#fab511]" aria-hidden="true" />
                          <span className="hidden sm:inline">Minimizar</span>
                        </button>
                      </div>

                    </div>
                  )}

                  {/* Modo Maximizado: Botón superior derecho para cerrar/minimizar */}
                  {isMaximized && (
                    <button
                      type="button"
                      onClick={handleMinimize}
                      className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-2 sm:p-2.5 rounded-xl border border-white/20 shadow-xl transition-all hover:scale-105 cursor-pointer z-30"
                      title="Cerrar / Volver a tamaño normal"
                      aria-label="Cerrar video maximizado"
                    >
                      <X className="w-5 h-5 text-[#fab511]" aria-hidden="true" />
                    </button>
                  )}

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
