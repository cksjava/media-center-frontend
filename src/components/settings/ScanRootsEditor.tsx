import { useMemo, useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

export function ScanRootsEditor(props: {
  roots: string[];
  onChange: (next: string[]) => void;
  onSave: () => Promise<void>;
  saving?: boolean;
}) {
  const { roots, onChange, onSave, saving } = props;
  const [draft, setDraft] = useState("");

  const cleaned = useMemo(
    () => roots.map((r) => r.trim()).filter(Boolean),
    [roots]
  );

  const add = () => {
    const v = draft.trim();
    if (!v) return;
    if (cleaned.includes(v)) {
      setDraft("");
      return;
    }
    onChange([...cleaned, v]);
    setDraft("");
  };

  const remove = (root: string) => {
    onChange(cleaned.filter((x) => x !== root));
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold">Music folders</div>
          <div className="mt-1 text-sm text-zinc-400">
            Add one or more root folders. Scan is recursive and will index all <code>.flac</code> files.
          </div>
        </div>

        <Button onClick={onSave} disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-2">
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder='Example: /mnt/music or /media/ssd/Music'
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
        />
        <Button variant="ghost" onClick={add}>
          Add
        </Button>
      </div>

      <div className="mt-4 space-y-2">
        {cleaned.length === 0 ? (
          <div className="text-sm text-zinc-500">No folders configured.</div>
        ) : (
          cleaned.map((r) => (
            <div
              key={r}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2"
            >
              <div className="min-w-0 truncate text-sm">{r}</div>
              <Button variant="danger" size="sm" onClick={() => remove(r)}>
                Remove
              </Button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
