import React from "react";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl bg-zinc-900/60 border border-zinc-800 px-4 py-2.5 text-sm outline-none focus:border-indigo-500/60 ${props.className ?? ""}`}
    />
  );
}
