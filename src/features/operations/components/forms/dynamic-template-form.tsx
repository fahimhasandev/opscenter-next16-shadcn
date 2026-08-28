"use client";

import { useEffect, useState } from "react";
import { TemplateFormField } from "./template-form-field";
import type { TemplateFormSchema } from "@/features/operations/types";

type Props = {
  schema: TemplateFormSchema;
  value: Record<string, unknown>;
  onChange: (value: Record<string, unknown>) => void;
};

export function DynamicTemplateForm({ schema, value, onChange }: Props) {
  useEffect(() => {
    const defaults: Record<string, unknown> = {};
    for (const field of schema.fields) {
      if (value[field.name] === undefined && field.defaultValue !== undefined) {
        defaults[field.name] = field.defaultValue;
      }
    }
    if (Object.keys(defaults).length) {
      onChange({ ...value, ...defaults });
    }
  }, [schema]); // intentional initialization

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <h3 className="font-semibold">{schema.title}</h3>
        {schema.description && (
          <p className="mt-1 text-sm text-slate-500">{schema.description}</p>
        )}
      </div>

      {schema.fields.map((field) => (
        <div key={field.name} className="grid gap-2">
          <label className="text-sm font-medium">
            {field.label}
            {field.required && <span className="text-red-500"> *</span>}
          </label>
          <TemplateFormField
            field={field}
            value={value[field.name]}
            onChange={(next) =>
              onChange({
                ...value,
                [field.name]: next
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
