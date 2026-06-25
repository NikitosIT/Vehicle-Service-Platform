import { useId, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  hint?: string;
  label: string;
  leading?: ReactNode;
}

export function FormField({
  error,
  hint,
  id,
  label,
  leading,
  className = '',
  type,
  ...props
}: FormFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const isPasswordField = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType =
    isPasswordField && isPasswordVisible ? 'text' : (type ?? 'text');

  return (
    <label className="grid gap-2" htmlFor={inputId}>
      <span className="text-sm font-medium text-slate-700">{label}</span>

      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 transition ${
          error
            ? 'border-rose-300 ring-2 ring-rose-100'
            : 'border-slate-200 focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-200'
        }`}
      >
        {leading ? (
          <span className="text-sm font-medium text-slate-400">{leading}</span>
        ) : null}

        <input
          {...props}
          className={`w-full border-0 bg-transparent text-sm text-slate-950 outline-none placeholder:text-slate-400 ${className}`.trim()}
          id={inputId}
          type={inputType}
        />

        {isPasswordField ? (
          <button
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
            className="shrink-0 rounded-full p-1 text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            onClick={() => setIsPasswordVisible((current) => !current)}
            type="button"
          >
            {isPasswordVisible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        ) : null}
      </div>

      {error ? (
        <span className="text-sm text-rose-600">{error}</span>
      ) : hint ? (
        <span className="text-sm text-slate-500">{hint}</span>
      ) : null}
    </label>
  );
}
