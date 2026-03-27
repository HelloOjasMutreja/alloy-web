import { useState } from 'react';
import { QuestionLayout } from '../../../components/layout';
import { SearchInput } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import { useCardSearch } from '../../../hooks/useCardSearch';
import styles from './CardSearchScreen.module.css';

export default function CardSearchScreen() {
  const { state, progress, canAdvance, setCurrentCard, removeExistingCard, advance, back } = useQuestionnaireContext();
  const { query, setQuery, results, loading } = useCardSearch();
  const [selectedCardName, setSelectedCardName] = useState('');

  return (
    <QuestionLayout
      question="Which card do you have?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <p className={styles.instruction}>Start typing — we&apos;ll find it</p>

      <SearchInput
        value={query}
        onChange={setQuery}
        results={results}
        loading={loading}
        placeholder="Search your card"
        onSelect={(cardId, cardName) => {
          setCurrentCard(cardId, cardName);
          setSelectedCardName(cardName);
          setQuery('');
        }}
      />

      {state.currentCards.length > 0 ? (
        <div className={styles.chipWrap}>
          <div className={styles.chip}>
            <span>{selectedCardName || state.currentCards[0]}</span>
            <button
              type="button"
              className={styles.clearButton}
              onClick={() => {
                removeExistingCard(state.currentCards[0]);
                setSelectedCardName('');
              }}
              aria-label="Clear selected card"
            >
              ×
            </button>
          </div>
        </div>
      ) : null}
    </QuestionLayout>
  );
}

