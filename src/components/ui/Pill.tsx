import styles from './Pill.module.css';

interface PillProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

export function Pill({ label, selected = false, onClick }: PillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-selected={selected}
      className={[styles.pill, selected ? styles.selected : ''].filter(Boolean).join(' ')}
    >
      {label}
    </button>
  );
}

