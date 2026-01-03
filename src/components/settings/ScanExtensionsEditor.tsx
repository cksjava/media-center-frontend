// src/components/settings/ScanExtensionsEditor.tsx
import { useMemo, useState } from "react";
import { Card } from "../common/Card";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

function normalize(ext: string) {
  const e = ext.trim().toLowerCase();
  if (!e) return "";
  return e.startsWith(".") ? e.slice(1) : e;
}

export function ScanExtensionsEditor(props: {
  extensions: string[];
  onChange: (next: string[]) => void;
  onSave: () => Promise<void>;
  saving?: boolean;
}) {
  const { extensions, onChange, onSave, saving } = props;
  const [draft, setDraft] = useState("");

  const cleaned = useMemo(() => {
    const arr = extensions.map(normalize).filter(Boolean);
    return Array.from(new Set(arr));
  }, [extensions]);

  const add = () => {
    const v = normalize(draft);
    if (!v) return;
    if (cleaned.includes(v)) {
      setDraft("");
      return;
    }
    onChange([...cleaned, v]);
    setDraft("");
  };

  const remove = (ext: string) => {
    onChange(cleaned.filter((x) => x !== ext));
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-base font-semibold">File types</div>
          <div className="mt-1 text-sm text-zinc-400">
            These extensions will be scanned recursively. Example: <code>m4a</code>, <code>flac</code>, <code>mp3</code>.
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
          placeholder="Example: m4a"
          onKeyDown={(e) => {
            if (e.key === "Enter") add();
          }}
        />
        <Button variant="ghost" onClick={add}>
          Add
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {cleaned.length === 0 ? (
          <div className="text-sm text-zinc-500">No extensions configured.</div>
        ) : (
          cleaned.map((e) => (
            <div key={e} className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2">
              <div className="text-sm">.{e}</div>
              <button
                className="text-xs text-zinc-400 hover:text-zinc-200"
                onClick={() => remove(e)}
                aria-label={`Remove ${e}`}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>

      <div className="mt-3 text-xs text-zinc-500">
        Recommended for your library: <code>m4a</code>. Add <code>flac</code> later if you switch formats.
      </div>
    </Card>
  );
}
