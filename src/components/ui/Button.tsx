import type { ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  children,
  className,
}: ButtonProps) {
  const sizeClass = variant === 'text' ? '' : styles[size];
  const classNames = [styles.button, styles[variant], sizeClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" onClick={onClick} disabled={disabled} className={classNames}>
      {children}
    </button>
  );
}

