import { QuestionLayout } from '../../../components/layout';
import { Tile } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import type { Goal } from '../../../types/questionnaire';
import styles from './GoalScreen.module.css';

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
};

const icons = {
  savings: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  rewards: (
    <svg {...iconProps}>
      <path
        d="M12 3.5l2.5 5.1 5.6.8-4.1 4 1 5.6L12 16.2 7 19l1-5.6-4.1-4 5.6-.8L12 3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  ),
  credit: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.8 11.2L12 8l3.2 3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  travel: (
    <svg {...iconProps}>
      <path
        d="M3 13.2l7.4-1.9 3.6-5.2c.5-.7 1.6-.4 1.7.4l.2 4.2 4 .8c.9.2.9 1.4 0 1.6l-4 .8-.2 4.2c-.1.8-1.2 1.1-1.7.4l-3.6-5.2L3 14.8c-1.1-.3-1.1-1.3 0-1.6z"
        fill="currentColor"
      />
    </svg>
  ),
  question: (
    <svg {...iconProps}>
      <path
        d="M9.2 9.3A2.8 2.8 0 0 1 12 7c1.7 0 3 1.2 3 2.7 0 1.2-.7 2-1.9 2.7-.9.5-1.3 1-1.3 1.9v.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" />
    </svg>
  ),
};

const GOALS: Array<{ label: string; sublabel: string; value: Goal; icon: keyof typeof icons }> = [
  {
    label: 'Save on spending',
    sublabel: 'Cashback and offers',
    value: 'SAVINGS',
    icon: 'savings',
  },
  {
    label: 'Earn rewards',
    sublabel: 'Points, miles, perks',
    value: 'REWARDS',
    icon: 'rewards',
  },
  {
    label: 'Build credit',
    sublabel: 'Establish my history',
    value: 'BUILD_CREDIT',
    icon: 'credit',
  },
  {
    label: 'Travel benefits',
    sublabel: 'Lounge, miles, forex',
    value: 'TRAVEL',
    icon: 'travel',
  },
  {
    label: 'Not sure yet',
    sublabel: 'Help me figure it out',
    value: 'NOT_SURE',
    icon: 'question',
  },
];

export default function GoalScreen() {
  const { state, progress, canAdvance, setGoal, advance, back } = useQuestionnaireContext();

  return (
    <QuestionLayout
      question="What's your main goal with a credit card?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <div className={styles.grid}>
        {GOALS.map((goal, index) => (
          <div key={goal.value} className={index === GOALS.length - 1 ? styles.fullWidth : undefined}>
            <Tile
              variant="icon"
              icon={icons[goal.icon]}
              label={goal.label}
              sublabel={goal.sublabel}
              selected={state.goal === goal.value}
              animationDelay={(index + 1) * 80}
              onClick={() => setGoal(goal.value)}
            />
          </div>
        ))}
      </div>
    </QuestionLayout>
  );
}

