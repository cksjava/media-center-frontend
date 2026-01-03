export function EmptyState(props: { title: string; hint?: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.03] p-10 text-center ring-1 ring-white/[0.02]">
      <div className="text-lg font-semibold tracking-tight text-zinc-50">{props.title}</div>
      {props.hint ? <div className="mt-3 text-sm text-zinc-400">{props.hint}</div> : null}
    </div>
  );
}
