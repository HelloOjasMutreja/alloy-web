import { QuestionLayout } from '../../../components/layout';
import { Pill } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/useQuestionnaireContext';
import type { Tenure } from '../../../types/questionnaire';
import styles from './TenureScreen.module.css';

const TENURE_OPTIONS: Array<{ label: string; value: Tenure }> = [
  { label: 'Under 6 months', value: 'UNDER_6M' },
  { label: '6–12 months', value: '6_12M' },
  { label: '1–2 years', value: '1_3Y' },
  { label: 'More than 2 years', value: '3Y_PLUS' },
];

export default function TenureScreen() {
  const { state, progress, canAdvance, setTenure, advance, back } = useQuestionnaireContext();

  return (
    <QuestionLayout
      question="How long have you had it?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <div className={styles.pills}>
        {TENURE_OPTIONS.map((option) => (
          <Pill
            key={option.value}
            label={option.label}
            selected={state.tenure === option.value}
            onClick={() => setTenure(option.value)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}


