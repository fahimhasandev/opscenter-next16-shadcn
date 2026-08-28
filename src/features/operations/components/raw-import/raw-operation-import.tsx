"use client";

import { FileJson2 } from "lucide-react";
import { useState } from "react";
import { RawOperationDialog } from "./raw-operation-dialog";
import { Button } from "@/components/ui/button";
import {
  parseRawOperation,
  type RawOperationPayload,
} from "@/features/operations/lib/raw-operation";

type Props = {
  onApply: (payload: RawOperationPayload, raw?: string) => Promise<void>;
};

const SAMPLE = `{
  "apache": {
    "config": {
      "backup": {
        "backup_name": "www.example.com.xml-20230627-181802"
      }
    }
  },
  "hostname": [
    "example.net",
    "example.net"
  ],
  "template_name": "apache-restore_xml_backup"
}`;

export function RawOperationImport({ onApply }: Props) {
  const [open, setOpen] = useState(false);
  const [raw, setRaw] = useState(SAMPLE);
  const [error, setError] = useState("");
  const [applying, setApplying] = useState(false);

  async function apply() {
    try {
      setError("");
      setApplying(true);
      const payload = parseRawOperation(raw);
      await onApply(payload, raw);
      setOpen(false);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Could not parse input.",
      );
    } finally {
      setApplying(false);
    }
  }

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <FileJson2 className="mr-2 h-4 w-4" />
        Submit Raw JSON/YAML
      </Button>

      {open && (
        <RawOperationDialog
          raw={raw}
          error={error}
          applying={applying}
          onRawChange={setRaw}
          onApply={apply}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
