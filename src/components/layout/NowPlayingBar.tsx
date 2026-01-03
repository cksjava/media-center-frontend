import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackwardStep,
  faForwardStep,
  faPause,
  faPlay,
  faStop,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import { usePlayer } from "../../context/PlayerContext";
import { formatDuration } from "../../utils/format";

export function NowPlayingBar() {
  const p = usePlayer();
  const current = p.queue[p.currentIndex];

  if (!current) return null;

  // Try common cover fields without assuming your exact schema.
  // If none exist, we show a placeholder.
  const coverSrc =
    (current as any).coverUrl ||
    (current as any).cover ||
    (current as any).coverPath ||
    (current as any).artworkUrl ||
    (current as any).artwork ||
    "";

  // Dummy seek state (visual only)
  const totalSec = Number((current as any).durationSec || 0) || 0;
  const dummyPct = 0.35; // 35% progress (visual only)
  const dummyPosSec = totalSec ? Math.floor(totalSec * dummyPct) : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* subtle top border + blurred glass */}
      <div className="border-t border-white/10 bg-zinc-950/75 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 py-2.5 sm:py-3">
          {/* SEEK (dummy) */}
          <div className="flex items-center gap-3 pb-2">
            <div className="w-10 text-[11px] tabular-nums text-zinc-400 text-right">
              {totalSec ? formatDuration(dummyPosSec) : "0:00"}
            </div>

            <div className="relative h-2 w-full">
              {/* track */}
              <div className="absolute inset-0 rounded-full bg-white/10" />
              {/* fill */}
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-indigo-500/90"
                style={{ width: `${Math.round(dummyPct * 100)}%` }}
              />
              {/* knob */}
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow ring-1 ring-black/30"
                style={{ left: `calc(${Math.round(dummyPct * 100)}% - 6px)` }}
              />
            </div>

            <div className="w-10 text-[11px] tabular-nums text-zinc-400">
              {totalSec ? formatDuration(totalSec) : "--:--"}
            </div>
          </div>

          {/* MAIN ROW */}
          <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
            {/* LEFT: cover + metadata */}
            <div className="min-w-0 flex items-center gap-3">
              <div className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10">
                {coverSrc ? (
                  <img
                    src={coverSrc}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center text-[10px] text-zinc-400">
                    NO ART
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <div className="truncate text-sm sm:text-[15px] font-semibold text-zinc-50">
                  {current.title}
                </div>
                <div className="truncate text-[11px] sm:text-xs text-zinc-400">
                  {p.queueLabel ? p.queueLabel : "Queue"} • Track{" "}
                  {p.currentIndex + 1}/{p.queue.length}
                  {totalSec ? ` • ${formatDuration(totalSec)}` : ""}
                </div>
              </div>
            </div>

            {/* CENTER: transport controls */}
            <div className="flex items-center justify-center gap-2">
              <IconButton onClick={p.prev} label="Previous">
                <FontAwesomeIcon icon={faBackwardStep} />
              </IconButton>

              <button
                className="h-10 w-12 sm:w-14 rounded-2xl bg-indigo-500/90 hover:bg-indigo-500 text-white shadow-sm shadow-indigo-500/20 ring-1 ring-white/10
                           active:scale-[0.98] transition flex items-center justify-center
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70"
                onClick={p.togglePlay}
                aria-label="Play / Pause"
              >
                <FontAwesomeIcon icon={p.isPlaying ? faPause : faPlay} />
              </button>

              <IconButton onClick={p.next} label="Next">
                <FontAwesomeIcon icon={faForwardStep} />
              </IconButton>

              <IconButton onClick={p.stop} label="Stop">
                <FontAwesomeIcon icon={faStop} />
              </IconButton>
            </div>

            {/* RIGHT: volume (desktop) */}
            <div className="hidden sm:flex items-center justify-end gap-3">
              <FontAwesomeIcon icon={faVolumeHigh} className="text-zinc-400" />
              <input
                type="range"
                min={0}
                max={100}
                value={p.volume}
                onChange={(e) => p.setVolume(Number(e.target.value))}
                className="w-56 accent-indigo-500"
                aria-label="Volume"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconButton(props: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={props.onClick}
      aria-label={props.label}
      className="h-10 w-10 rounded-2xl bg-white/5 hover:bg-white/10 text-zinc-100 ring-1 ring-white/10
                 active:scale-[0.98] transition flex items-center justify-center
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
    >
      {props.children}
    </button>
  );
}
