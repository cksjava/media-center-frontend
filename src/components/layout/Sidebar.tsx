import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompactDisc, faHeart, faList, faSearch } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

const Item = (props: { to: string; icon: any; label: string }) => (
  <NavLink
    to={props.to}
    className={({ isActive }) =>
      `flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
        isActive ? "bg-indigo-500/15 text-indigo-200 border border-indigo-500/20" : "text-zinc-200 hover:bg-zinc-800/60"
      }`
    }
  >
    <FontAwesomeIcon icon={props.icon} className="text-zinc-300" />
    <span className="truncate">{props.label}</span>
  </NavLink>
);

export function Sidebar(props: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* overlay on mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition md:hidden ${props.open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={props.onClose}
      />
      <aside
        className={`fixed z-50 md:static top-0 left-0 h-full w-72 md:w-72 bg-zinc-950 border-r border-zinc-900 p-4 transition-transform ${
          props.open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">Media Center</div>
          <button className="md:hidden text-zinc-400 hover:text-zinc-200" onClick={props.onClose}>
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-2">
          <Item to="/albums" icon={faCompactDisc} label="Albums" />
          <Item to="/playlists" icon={faList} label="Playlists" />
          <Item to="/favourites" icon={faHeart} label="Favourites" />
          <Item to="/search" icon={faSearch} label="Search" />
          <Item to="/settings" icon={faGear} label="Settings" />
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-900 bg-zinc-900/30 p-4 text-sm text-zinc-300">
          <div className="font-medium text-zinc-100">Tip</div>
          <div className="mt-2 text-zinc-400">Use Search to build a queue, then shuffle or play sequentially.</div>
        </div>
      </aside>
    </>
  );
}
