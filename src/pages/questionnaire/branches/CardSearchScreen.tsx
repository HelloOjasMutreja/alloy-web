import { useState } from 'react';
import { QuestionLayout } from '../../../components/layout';
import { SearchInput } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/useQuestionnaireContext';
import { useCardSearch } from '../../../hooks/useCardSearch';
import styles from './CardSearchScreen.module.css';

export default function CardSearchScreen() {
  const { state, progress, canAdvance, setCurrentCard, removeExistingCard, advance, back } = useQuestionnaireContext();
  const { query, setQuery, results, loading, searchError } = useCardSearch();
  const [selectedCardName, setSelectedCardName] = useState('');
  const [showManualInput, setShowManualInput] = useState(false);
  const [manualCardName, setManualCardName] = useState('');

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
        showError={searchError}
        placeholder="Search your card"
        onManualEntryClick={() => {
          setShowManualInput(true);
        }}
        onSelect={(cardId, cardName) => {
          setCurrentCard(cardId, cardName);
          setSelectedCardName(cardName);
          setShowManualInput(false);
          setQuery('');
        }}
      />

      {showManualInput ? (
        <div className={styles.manualWrap}>
          <input
            className={styles.manualInput}
            value={manualCardName}
            onChange={(event) => setManualCardName(event.target.value)}
            placeholder="Type your card name"
            aria-label="Manual card name"
          />
          <button
            type="button"
            className={styles.manualButton}
            onClick={() => {
              if (!manualCardName.trim()) return;
              setCurrentCard('unknown', manualCardName.trim());
              setSelectedCardName(manualCardName.trim());
              setShowManualInput(false);
              setManualCardName('');
              setQuery('');
            }}
          >
            Use this card
          </button>
        </div>
      ) : null}

      {state.currentCards.length > 0 ? (
        <div className={styles.chipWrap}>
          <div className={styles.chip}>
            <span>{state.manualCardEntry ? (state.manualCardName ?? selectedCardName) : (selectedCardName || state.currentCards[0])}</span>
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


