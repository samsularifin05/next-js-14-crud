// components/RenderField.tsx
"use client";
import React from "react";
import { Field } from "react-final-form";

interface RenderFieldProps<T> {
  name: keyof T;
  placeholder: string;
  type?: string;
}

function RenderField<T>({
  name,
  placeholder,
  type = "text"
}: RenderFieldProps<T>) {
  return (
    <Field name={name as string}>
      {({ input, meta }) => (
        <div className="flex gap-2 flex-col">
          <input
            {...input}
            type={type}
            placeholder={placeholder}
            className="flex outline-none outline-slate-950 rounded w-full p-2"
          />
          {meta.touched && meta.error && (
            <span className="text-red-500">{meta.error}</span>
          )}
        </div>
      )}
    </Field>
  );
}

export default RenderField;
