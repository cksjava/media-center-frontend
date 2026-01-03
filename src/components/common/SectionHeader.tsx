import React from "react";

export function SectionHeader(props: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight text-zinc-50">{props.title}</h2>
      <div className="flex items-center gap-2">{props.right}</div>
    </div>
  );
}
