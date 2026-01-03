import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export function Button({ variant = "primary", size = "md", className, ...rest }: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition active:scale-[.99] disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes = size === "sm" ? "px-3 py-2 text-sm" : "px-4 py-2.5 text-sm";
  const styles =
    variant === "primary"
      ? "bg-indigo-500/90 hover:bg-indigo-500 text-white"
      : variant === "danger"
        ? "bg-rose-500/90 hover:bg-rose-500 text-white"
        : "bg-zinc-800/60 hover:bg-zinc-800 text-zinc-100";

  return <button className={`${base} ${sizes} ${styles} ${className ?? ""}`} {...rest} />;
}
