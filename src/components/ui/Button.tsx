import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex select-none items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-ouro text-asfalto hover:bg-ouro-claro',
  secondary: 'border border-aco-claro bg-transparent text-branco hover:border-ouro hover:text-ouro-claro',
  ghost: 'text-nevoa hover:text-ouro-claro',
};

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.9rem]',
  md: 'h-12 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-base',
};

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cx(base, variants[variant], sizes[size], className);
}

type CommonProps = { variant?: Variant; size?: Size; icon?: ReactNode; children: ReactNode };

export function ButtonLink({
  variant,
  size,
  icon,
  children,
  className,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const external = rest.href?.startsWith('http');
  return (
    <a
      className={buttonClass(variant, size, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}

export function Button({
  variant,
  size,
  icon,
  children,
  className,
  type = 'button',
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type={type} className={buttonClass(variant, size, className)} {...rest}>
      {icon}
      <span>{children}</span>
    </button>
  );
}
