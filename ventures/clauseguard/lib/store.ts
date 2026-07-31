import { randomUUID } from "crypto";
import type { ContractAnalysis } from "./anthropic";

export interface StoredReport extends ContractAnalysis {
  id: string;
  createdAt: number;
  unlocked: boolean;
  priceCents: number;
}

const DEFAULT_PRICE_CENTS = 900;

// In-memory store: fine for a single dev/preview instance. On serverless
// platforms with multiple instances this won't be consistent across
// requests — swap for Redis/KV/a database before relying on this in
// production. See README "Known limitations".
//
// Route handlers are bundled independently, so a plain module-scope Map
// gets re-instantiated per route instead of shared. Cache it on
// globalThis (same trick used for Prisma clients) to force one real
// process-wide singleton.
declare global {
  // eslint-disable-next-line no-var
  var __clauseguardStore: Map<string, StoredReport> | undefined;
}

const store = globalThis.__clauseguardStore ?? new Map<string, StoredReport>();
globalThis.__clauseguardStore = store;

export function saveReport(analysis: ContractAnalysis): StoredReport {
  const report: StoredReport = {
    ...analysis,
    id: randomUUID(),
    createdAt: Date.now(),
    unlocked: false,
    priceCents: DEFAULT_PRICE_CENTS,
  };
  store.set(report.id, report);
  return report;
}

export function getReport(id: string): StoredReport | undefined {
  return store.get(id);
}

export function unlockReport(id: string): StoredReport | undefined {
  const report = store.get(id);
  if (!report) return undefined;
  report.unlocked = true;
  store.set(id, report);
  return report;
}
