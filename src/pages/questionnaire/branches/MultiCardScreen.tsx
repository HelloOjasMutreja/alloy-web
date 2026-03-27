import { useMemo, useState } from 'react';
import { QuestionLayout } from '../../../components/layout';
import { SearchInput } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/useQuestionnaireContext';
import { useCardSearch } from '../../../hooks/useCardSearch';
import styles from './MultiCardScreen.module.css';

export default function MultiCardScreen() {
  const { state, progress, canAdvance, addExistingCard, removeExistingCard, advance, back } = useQuestionnaireContext();
  const { query, setQuery, results, loading } = useCardSearch();
  const [cardNames, setCardNames] = useState<Record<string, string>>({});

  const selectedSet = useMemo(() => new Set(state.currentCards), [state.currentCards]);
  const filteredResults = results.filter((card) => !selectedSet.has(card.card_id));

  return (
    <QuestionLayout
      question="Which cards do you already hold?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <p className={styles.instruction}>Add all of them</p>

      <SearchInput
        value={query}
        onChange={setQuery}
        results={filteredResults}
        loading={loading}
        placeholder="Search your cards"
        onSelect={(cardId, cardName) => {
          addExistingCard(cardId);
          setCardNames((prev) => ({ ...prev, [cardId]: cardName }));
          setQuery('');
        }}
      />

      {state.currentCards.length > 0 ? (
        <div className={styles.chipWrap}>
          {state.currentCards.map((cardId) => (
            <div key={cardId} className={styles.chip}>
              <span>{cardNames[cardId] ?? cardId}</span>
              <button
                type="button"
                className={styles.clearButton}
                onClick={() => removeExistingCard(cardId)}
                aria-label={`Remove ${cardNames[cardId] ?? cardId}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </QuestionLayout>
  );
}


