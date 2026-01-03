import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function TopBar(props: { title: string; onMenu: () => void; right?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-40">
      <div className="border-b border-white/10 bg-zinc-950/70 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3 min-w-0">
              <button
                className="md:hidden h-10 w-10 grid place-items-center rounded-xl bg-white/5 hover:bg-white/10 ring-1 ring-white/10
                           active:scale-[0.98] transition
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
                onClick={props.onMenu}
                aria-label="Open menu"
              >
                <FontAwesomeIcon icon={faBars} className="text-zinc-100" />
              </button>

              <div className="min-w-0">
                <div className="truncate text-[15px] sm:text-base font-semibold tracking-tight text-zinc-50">
                  {props.title}
                </div>
                {/* optional subtitle slot later if you ever want it; leaving out for now */}
              </div>
            </div>

            <div className="flex items-center gap-2">{props.right}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
