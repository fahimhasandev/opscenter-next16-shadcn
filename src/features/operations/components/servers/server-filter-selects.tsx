import { MNEMONIC_OPTIONS, PLATFORM_OPTIONS } from "@/features/operations/config/operations-ui";

type Props = { platform: string; mnemonicId: string; allowedPlatforms: ("windows" | "linux")[]; onPlatformChange: (value: string) => void; onMnemonicChange: (value: string) => void };

export function ServerFilterSelects({ platform, mnemonicId, allowedPlatforms, onPlatformChange, onMnemonicChange }: Props) {
  const supported = new Set(allowedPlatforms);
  const options = supported.size === 1
    ? PLATFORM_OPTIONS.filter((option) => option.value === allowedPlatforms[0])
    : PLATFORM_OPTIONS.filter((option) => option.value === "all" || supported.has(option.value as "windows" | "linux"));
  const selected = options.some((option) => option.value === platform) ? platform : (options[0]?.value ?? "all");

  return <>
    <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm" value={selected} onChange={(event) => onPlatformChange(event.target.value)} aria-label="Platform filter">
      {options.map((option) => <option key={option.value} value={option.value}>Platform: {option.label}</option>)}
    </select>
    <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm" value={mnemonicId} onChange={(event) => onMnemonicChange(event.target.value)} aria-label="Mnemonic filter">
      {MNEMONIC_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.id === "all" ? "Mnemonics: ALL" : `${option.label} — ${option.team}`}</option>)}
    </select>
  </>;
}
