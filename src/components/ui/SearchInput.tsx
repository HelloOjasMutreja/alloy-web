import { useMemo } from 'react';
import type { CardSearchResult } from '../../types/cards';
import styles from './SearchInput.module.css';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (cardId: string, cardName: string) => void;
  placeholder?: string;
  results: CardSearchResult[];
  loading?: boolean;
}

export function SearchInput({
  value,
  onChange,
  onSelect,
  placeholder,
  results,
  loading = false,
}: SearchInputProps) {
  const showDropdown = useMemo(() => results.length > 0 || (!loading && value.trim().length >= 2), [loading, results.length, value]);

  return (
    <div className={styles.wrapper}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
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
            <div className={styles.emptyRow}>I don't see my card</div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

