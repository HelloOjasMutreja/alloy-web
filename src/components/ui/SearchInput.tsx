import { useMemo } from 'react';
import type { CardSearchResult } from '../../types/cards';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (cardId: string, cardName: string) => void;
  onManualEntryClick?: () => void;
  placeholder?: string;
  results: CardSearchResult[];
  loading?: boolean;
  showError?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onSelect,
  onManualEntryClick,
  placeholder,
  results,
  loading = false,
  showError = false,
}: SearchInputProps) {
  const showDropdown = useMemo(() => results.length > 0 || (!loading && value.trim().length >= 2), [loading, results.length, value]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder ?? 'Search'}
      />

      {loading ? (
        <svg className={styles.spinner} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
        </svg>
      ) : null}

      {showDropdown ? (
        <div className={styles.dropdown}>
          {results.map((card) => (
            <button
              key={card.card_id}
              type="button"
              className={styles.row}
              onClick={() => onSelect(card.card_id, card.card_name)}
            >
              <div className={styles.name}>{card.card_name}</div>
              <div className={styles.bank}>{card.bank}</div>
            </button>
          ))}

          {!loading && results.length === 0 ? (
            <button type="button" className={styles.row} onClick={onManualEntryClick}>
              <div className={styles.emptyRow}>I don&apos;t see my card</div>
            </button>
          ) : null}
        </div>
      ) : null}

      {showError ? (
        <p className={styles.errorText}>Search unavailable — try typing the card name</p>
      ) : null}
    </div>
  );
}

