import { QuestionLayout } from '../../../components/layout';
import { Tile } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import type { IncomeBracket } from '../../../types/questionnaire';
import styles from './IncomeBracketScreen.module.css';

const OPTIONS: Array<{ label: string; value: IncomeBracket }> = [
  { label: 'Under ₹3 lakh', value: 'I1' },
  { label: '₹3 – ₹6 lakh', value: 'I2' },
  { label: '₹6 – ₹12 lakh', value: 'I3' },
  { label: '₹12 – ₹25 lakh', value: 'I4' },
  { label: 'Above ₹25 lakh', value: 'I5' },
];

export default function IncomeBracketScreen() {
  const { state, progress, canAdvance, setIncomeBracket, advance, back } = useQuestionnaireContext();

  return (
    <QuestionLayout
      question="What's your annual income?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <p className={styles.instruction}>This helps us show you cards you can actually get approved for.</p>

      <div className={styles.tiles}>
        {OPTIONS.map((option, index) => (
          <Tile
            key={option.value}
            variant="tap-card"
            label={option.label}
            selected={state.incomeBracket === option.value}
            animationDelay={(index + 1) * 80}
            onClick={() => setIncomeBracket(option.value)}
          />
        ))}
      </div>
    </QuestionLayout>
  );
}

