// src/api/settingsApi.ts
import { http } from "./http";

const ROOTS_KEY = "library.scan.roots";
const EXTS_KEY = "library.scan.extensions";

function parseArray(value: any): string[] {
  if (!value) return [];
  try {
    const v = JSON.parse(String(value));
    return Array.isArray(v) ? v.map(String).map((s) => s.trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
}

export async function getScanRoots(): Promise<string[]> {
  const res = await http.get(`/api/settings/${ROOTS_KEY}`);
  return parseArray(res.data?.value);
}

export async function setScanRoots(roots: string[]): Promise<void> {
  await http.put(`/api/settings/${ROOTS_KEY}`, { value: JSON.stringify(roots) });
}

export async function getScanExtensions(): Promise<string[]> {
  const res = await http.get(`/api/settings/${EXTS_KEY}`);
  const arr = parseArray(res.data?.value);

  // nice default if unset
  return arr.length ? arr : ["m4a"];
}

export async function setScanExtensions(exts: string[]): Promise<void> {
  await http.put(`/api/settings/${EXTS_KEY}`, { value: JSON.stringify(exts) });
}

export type ScanStatus = {
  running: boolean;
  startedAt?: number;
  finishedAt?: number;
  result?: {
    roots?: string[];
    extensions?: string[];
    matchedFiles?: number;
    scanned?: number;
    indexed?: number;
    updated?: number;
    skipped?: number;
    duplicates?: number;
    errors?: number;
    warnings?: string[];
  };
  error?: string;
};

export async function startScan() {
  const res = await http.post("/api/library/scan");
  return res.data;
}

export async function getScanStatus(): Promise<ScanStatus> {
  const res = await http.get("/api/library/scan/status");
  return res.data;
}
