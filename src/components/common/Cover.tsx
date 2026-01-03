export function Cover(props: {
  coverPath?: string | null;
  alt: string;
  size?: "sm" | "md" | "lg" | "grid";
}) {
  const size = props.size ?? "md";

  // For "grid", width is 100% of the card and height is controlled by aspect-square.
  const sizeCls =
    size === "sm"
      ? "w-10"
      : size === "lg"
      ? "w-24"
      : size === "grid"
      ? "w-full"
      : "w-16";

  // coverPath is stored relative under /covers
  const src = props.coverPath ? `/covers/${props.coverPath}` : null;

  return (
    <div
      className={[
        sizeCls,
        "aspect-square rounded-xl overflow-hidden",
        "bg-white/5 ring-1 ring-white/10",
        "flex items-center justify-center",
      ].join(" ")}
    >
      {src ? (
        <img
          src={src}
          alt={props.alt}
          className="h-full w-full object-cover"
          loading="lazy"
          draggable={false}
        />
      ) : (
        // quiet placeholder instead of noisy "No cover" text
        <div className="h-full w-full bg-gradient-to-br from-zinc-700/40 to-zinc-800/40" />
      )}
    </div>
  );
}
