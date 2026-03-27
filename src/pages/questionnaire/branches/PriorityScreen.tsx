import { QuestionLayout } from '../../../components/layout';
import { Tile } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/QuestionnaireContext';
import styles from './PriorityScreen.module.css';

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
};

const icons = {
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
  gaps: (
    <svg {...iconProps}>
      <rect x="4.5" y="5.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  fees: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
  credit: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8.8 11.2L12 8l3.2 3.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tier: (
    <svg {...iconProps}>
      <path d="M4.5 16.5h15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 16.5V12M12 16.5V9M16 16.5V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const PRIORITY_OPTIONS = [
  { value: 'MAXIMISE_REWARDS', label: 'Maximise rewards', sublabel: 'Points, cashback', icon: icons.rewards },
  { value: 'FILL_GAPS', label: 'Fill my gaps', sublabel: "Cover what's missing", icon: icons.gaps },
  { value: 'LOWER_FEES', label: 'Lower fees', sublabel: 'Reduce annual costs', icon: icons.fees },
  { value: 'TRAVEL_PERKS', label: 'Travel perks', sublabel: 'Lounges, miles, forex', icon: icons.travel },
  { value: 'CREDIT_BUILDING', label: 'Build credit', sublabel: 'Improve my score', icon: icons.credit },
  { value: 'UPGRADE_TIER', label: 'Upgrade tier', sublabel: 'Move to premium', icon: icons.tier },
] as const;

export default function PriorityScreen() {
  const { state, progress, canAdvance, setPriorityRanking, advance, back } = useQuestionnaireContext();
  const maxReached = state.priorityRanking.length >= 3;

  const toggleRank = (value: string) => {
    const exists = state.priorityRanking.includes(value);
    if (exists) {
      setPriorityRanking(state.priorityRanking.filter((item) => item !== value));
      return;
    }
    if (maxReached) {
      return;
    }
    setPriorityRanking([...state.priorityRanking, value]);
  };

  return (
    <QuestionLayout
      question="What matters most to you?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <p className={styles.instruction}>Tap to rank — first tap = highest priority</p>

      <div className={styles.grid}>
        {PRIORITY_OPTIONS.map((option, index) => {
          const rankIndex = state.priorityRanking.indexOf(option.value);
          const selected = rankIndex >= 0;
          const dimmed = maxReached && !selected;

          return (
            <div key={option.value} className={dimmed ? styles.dimmed : undefined}>
              <Tile
                variant="ranked"
                icon={option.icon}
                label={option.label}
                sublabel={option.sublabel}
                selected={selected}
                rank={selected ? rankIndex + 1 : undefined}
                animationDelay={(index + 1) * 80}
                onClick={() => toggleRank(option.value)}
              />
            </div>
          );
        })}
      </div>
    </QuestionLayout>
  );
}

