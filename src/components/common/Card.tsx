import React from "react";

export function Card(props: {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={props.onClick}
      className={[
        "rounded-2xl bg-white/[0.03] ring-1 ring-white/10 shadow-sm",
        "hover:bg-white/[0.06] hover:ring-white/20",
        "transition",
        props.className ?? "",
      ].join(" ")}
    >
      {props.children}
    </div>
  );
}
