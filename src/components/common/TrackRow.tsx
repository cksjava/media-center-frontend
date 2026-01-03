import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { Track } from "../../types/models";
import { formatDuration } from "../../utils/format";
import { Button } from "./Button";

export function TrackRow(props: {
  track: Track;
  index?: number;
  onPlay?: () => void;
  onAddToQueue?: () => void;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
}) {
  const t = props.track;

  return (
    <div
      className="group flex items-center gap-3 rounded-2xl bg-white/[0.03] ring-1 ring-white/10
                 px-3 sm:px-4 py-3 hover:bg-white/[0.05] transition"
    >
      {/* track number */}
      <div className="w-8 text-center text-sm tabular-nums text-zinc-400">
        {props.index != null ? props.index + 1 : ""}
      </div>

      {/* title + artist */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-zinc-50">
          {t.title}
        </div>
        <div className="truncate text-xs text-zinc-400">
          {t.artist?.name ?? "Unknown Artist"}
          {t.composer?.name ? ` • ${t.composer.name}` : ""}
        </div>
      </div>

      {/* duration */}
      <div className="hidden sm:block w-14 text-right text-xs tabular-nums text-zinc-400">
        {t.durationSec ? formatDuration(t.durationSec) : ""}
      </div>

      {/* actions */}
      <div className="flex items-center gap-2">
        {props.onToggleFavourite ? (
          <button
            className={[
              "h-8 w-8 rounded-xl grid place-items-center ring-1 transition",
              props.isFavourite
                ? "bg-rose-500/10 text-rose-200 ring-rose-500/20"
                : "bg-white/5 text-zinc-200 ring-white/10 hover:bg-white/10",
            ].join(" ")}
            onClick={props.onToggleFavourite}
            aria-label="Toggle favourite"
          >
            <FontAwesomeIcon icon={faHeartSolid} />
          </button>
        ) : null}

        {props.onAddToQueue ? (
          <Button variant="ghost" size="sm" onClick={props.onAddToQueue}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        ) : null}

        {props.onPlay ? (
          <Button size="sm" onClick={props.onPlay}>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
