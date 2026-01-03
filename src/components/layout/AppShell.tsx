import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { NowPlayingBar } from "./NowPlayingBar";

export function AppShell(props: {
  title: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* subtle app background texture */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_30%_-10%,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_90%_10%,rgba(255,255,255,0.06),transparent_55%)]" />
      </div>

      <div className="flex min-h-screen">
        <Sidebar open={open} onClose={() => setOpen(false)} />

        <main className="flex-1 min-w-0">
          <TopBar title={props.title} onMenu={() => setOpen(true)} right={props.right} />

          {/* content */}
          <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6 py-4 pb-32">
            {props.children}
          </div>
        </main>
      </div>

      <NowPlayingBar />
    </div>
  );
}
