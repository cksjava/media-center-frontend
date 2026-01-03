// src/pages/SettingsPage.tsx
import { useEffect, useState } from "react";
import { AppShell } from "../components/layout/AppShell";
import { EmptyState } from "../components/common/EmptyState";
import { ScanRootsEditor } from "../components/settings/ScanRootsEditor";
import { ScanExtensionsEditor } from "../components/settings/ScanExtensionsEditor";
import { ScanStatusCard } from "../components/settings/ScanStatusCard";
import {
  getScanRoots,
  setScanRoots,
  getScanExtensions,
  setScanExtensions,
  getScanStatus,
  startScan,
  type ScanStatus,
} from "../api/settingsApi";

export function SettingsPage() {
  const [roots, setRoots] = useState<string[]>([]);
  const [extensions, setExtensions] = useState<string[]>(["m4a"]);

  const [loading, setLoading] = useState(true);
  const [savingRoots, setSavingRoots] = useState(false);
  const [savingExts, setSavingExts] = useState(false);

  const [status, setStatus] = useState<ScanStatus | null>(null);
  const [scanning, setScanning] = useState(false);

  async function refreshAll() {
    setLoading(true);
    try {
      const [r, e] = await Promise.all([getScanRoots(), getScanExtensions()]);
      setRoots(r);
      setExtensions(e);
    } finally {
      setLoading(false);
    }
  }

  async function refreshStatus() {
    try {
      setStatus(await getScanStatus());
    } catch {
      setStatus({ running: false });
    }
  }

  useEffect(() => {
    refreshAll();
    refreshStatus();
  }, []);

  // Poll while running
  useEffect(() => {
    if (!status?.running) return;
    const t = setInterval(refreshStatus, 1200);
    return () => clearInterval(t);
  }, [status?.running]);

  async function saveRoots() {
    setSavingRoots(true);
    try {
      await setScanRoots(roots);
      await refreshAll();
    } finally {
      setSavingRoots(false);
    }
  }

  async function saveExts() {
    setSavingExts(true);
    try {
      await setScanExtensions(extensions);
      await refreshAll();
    } finally {
      setSavingExts(false);
    }
  }

  async function scanNow() {
    if (!roots.length) return;
    setScanning(true);
    try {
      await startScan();
      await refreshStatus();
    } finally {
      setScanning(false);
    }
  }

  return (
    <AppShell title="Settings">
      <div className="space-y-4">
        {loading ? (
          <div className="text-sm text-zinc-400">Loading settings…</div>
        ) : (
          <>
            <ScanRootsEditor roots={roots} onChange={setRoots} onSave={saveRoots} saving={savingRoots} />
            <ScanExtensionsEditor extensions={extensions} onChange={setExtensions} onSave={saveExts} saving={savingExts} />
          </>
        )}

        <ScanStatusCard status={status} onScan={scanNow} scanning={scanning} onRefresh={refreshStatus} />

        {!roots.length ? (
          <EmptyState title="Add at least one music folder to enable scanning" hint="Example: /mnt/music" />
        ) : null}
      </div>
    </AppShell>
  );
}
