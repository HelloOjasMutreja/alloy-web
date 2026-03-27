import { QuestionLayout } from '../../components/layout';
import { Tile } from '../../components/ui';
import { useQuestionnaireContext } from '../../context/useQuestionnaireContext';
import type { Intent } from '../../types/questionnaire';
import styles from './EntryGate.module.css';

const OPTIONS: Array<{ label: string; sublabel: string; value: Intent }> = [
  {
    label: 'No — looking for my first',
    sublabel: 'I want help picking the right one',
    value: 'FIRST',
  },
  {
    label: "Yes — not sure it's right for me",
    sublabel: "I want to know if I'm getting value",
    value: 'AUDIT',
  },
  {
    label: 'Yes — want to add another',
    sublabel: 'I have cards and want to optimise my stack',
    value: 'OPTIMISE',
  },
];

export default function EntryGate() {
  const { state, canAdvance, setIntent, advance } = useQuestionnaireContext();

  return (
    <QuestionLayout
      question="Do you currently have a credit card?"
      progress={0}
      showBack={false}
      showProgress={false}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <div className={styles.tiles}>
        {OPTIONS.map((option, index) => (
          <Tile
            key={option.value}
            variant="tap-card"
            label={option.label}
            sublabel={option.sublabel}
            selected={state.intent === option.value}
            animationDelay={(index + 1) * 80}
            onClick={() => setIntent(option.value)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}


