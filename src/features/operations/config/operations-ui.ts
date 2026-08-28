import type { MnemonicOption } from "@/features/operations/types";

export const PLATFORM_OPTIONS = [
  { label: "ALL", value: "all" },
  { label: "Windows", value: "windows" },
  { label: "Linux", value: "linux" }
] as const;

export const MNEMONIC_OPTIONS: MnemonicOption[] = [
  { id: "all", label: "ALL" },
  { id: "payments", label: "PAYMENTS", team: "Payments Team" },
  { id: "cards", label: "CARDS", team: "Cards Team" },
  { id: "identity", label: "IDENTITY", team: "Identity Team" },
  { id: "digital", label: "DIGITAL", team: "Digital Team" },
  { id: "shared-services", label: "SHARED-SERVICES", team: "Shared Services" }
];
