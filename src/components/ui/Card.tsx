import type { ReactNode } from 'react';
import styles from './Card.module.css';

type CardPadding = 'sm' | 'md' | 'lg' | 'none';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: CardPadding;
}

export function Card({ children, className, padding = 'none' }: CardProps) {
  const paddingClass =
    padding === 'sm'
      ? styles.paddingSm
      : padding === 'md'
        ? styles.paddingMd
        : padding === 'lg'
          ? styles.paddingLg
          : '';

  return <div className={[styles.card, paddingClass, className].filter(Boolean).join(' ')}>{children}</div>;
}

