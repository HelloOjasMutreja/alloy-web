import { useState } from 'react';
import { QuestionLayout } from '../../../components/layout';
import { Tile } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/useQuestionnaireContext';
import type { TravelType } from '../../../types/questionnaire';
import styles from './TravelTypeScreen.module.css';

type TravelOptionId = 'domestic' | 'international' | 'both';

const OPTIONS: Array<{ id: TravelOptionId; label: string; sublabel: string; value: TravelType }> = [
  { id: 'domestic', label: 'Domestic only', sublabel: 'Within India', value: 'DOMESTIC' },
  { id: 'international', label: 'International', sublabel: 'Outside India', value: 'INTERNATIONAL' },
  { id: 'both', label: 'Both', sublabel: 'I travel everywhere', value: 'INTERNATIONAL' },
];

export default function TravelTypeScreen() {
  const { state, progress, canAdvance, setTravelType, advance, back } = useQuestionnaireContext();
  const [selectedId, setSelectedId] = useState<TravelOptionId | null>(
    state.travelType === 'DOMESTIC' ? 'domestic' : state.travelType === 'INTERNATIONAL' ? 'international' : null
  );

  return (
    <QuestionLayout
      question="What kind of travel?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <div className={styles.tiles}>
        {OPTIONS.map((option, index) => (
          <Tile
            key={option.id}
            variant="tap-card"
            label={option.label}
            sublabel={option.sublabel}
            selected={selectedId === option.id}
            animationDelay={(index + 1) * 80}
            onClick={() => {
              setSelectedId(option.id);
              setTravelType(option.value);
            }}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}


