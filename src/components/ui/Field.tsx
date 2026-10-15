import { ChevronDown } from 'lucide-react';
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cx } from '../../lib/utils';

interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Rótulo + campo + mensagem de erro, com os atributos de acessibilidade corretos */
export function Field({ id, label, required, error, hint, className, children }: FieldProps) {
  return (
    <div className={cx('flex min-w-0 flex-col gap-2', className)}>
      <label htmlFor={id} className="text-[0.9rem] font-medium text-nevoa">
        {label}
        {required ? (
          <span className="text-ouro" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-cimento"> (opcional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-[0.82rem] leading-snug text-cimento">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[0.85rem] leading-snug text-erro">
          {error}
        </p>
      )}
    </div>
  );
}

export const describedBy = (id: string, error?: string, hint?: boolean) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;

export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx('field-input', className)} {...props} />;
}

export function TextArea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cx('field-input', className)} {...props} />;
}

export function SelectInput({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className="relative">
      <select className={cx('field-input', className)} {...props}>
        {children}
      </select>
      <ChevronDown
        size={18}
        strokeWidth={1.8}
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-cimento"
      />
    </div>
  );
}

interface ChoiceProps {
  name: string;
  legend: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  className?: string;
}

/** Grupo de opções (Sim / Não) em formato de botões */
export function ChoiceGroup({ name, legend, options, value, onChange, required, error, className }: ChoiceProps) {
  return (
    <fieldset className={cx('flex min-w-0 flex-col gap-2', className)} aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="mb-2 text-[0.9rem] font-medium text-nevoa">
        {legend}
        {required ? (
          <span className="text-ouro" aria-hidden="true">
            {' '}
            *
          </span>
        ) : (
          <span className="font-normal text-cimento"> (opcional)</span>
        )}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const id = `${name}-${option.toLowerCase().replace(/\s+/g, '-')}`;
          const checked = value === option;
          return (
            <label
              key={option}
              htmlFor={id}
              className={cx(
                'relative inline-flex h-11 cursor-pointer items-center rounded-full border px-4 text-[0.92rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ouro',
                checked ? 'border-ouro bg-ouro/10 text-ouro-claro' : 'border-aco bg-chumbo text-nevoa hover:border-aco-claro',
              )}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
      {error && (
        <p id={`${name}-error`} role="alert" className="text-[0.85rem] text-erro">
          {error}
        </p>
      )}
    </fieldset>
  );
}

export function ConsentCheckbox({
  id,
  name,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  name?: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-[0.88rem] leading-relaxed text-cimento">
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[var(--color-ouro)]"
        />
        <span>{children}</span>
      </label>
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[0.85rem] text-erro">
          {error}
        </p>
      )}
    </div>
  );
}
