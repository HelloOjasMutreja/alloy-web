import { QuestionLayout } from '../../../components/layout';
import { Tile } from '../../../components/ui';
import { useQuestionnaireContext } from '../../../context/useQuestionnaireContext';
import type { SpendCategory } from '../../../types/questionnaire';
import styles from './SpendCategoriesScreen.module.css';

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  'aria-hidden': true,
};

const icons = {
  fuel: (
    <svg {...iconProps}>
      <rect x="6" y="5" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.5h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 8h2l1.5 2v5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  dining: (
    <svg {...iconProps}>
      <path d="M8 5v6M6 5v6M10 5v6M7 11v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 5v14M15 5c2 0 3 1.8 3 4v2h-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
  groceries: (
    <svg {...iconProps}>
      <path d="M5.5 8h13l-1.3 7.5H6.8L5.5 8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 8a4 4 0 0 1 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  shopping: (
    <svg {...iconProps}>
      <path d="M6.5 8h11l-1 10h-9l-1-10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  entertainment: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8.8v6.4l5-3.2-5-3.2z" fill="currentColor" />
    </svg>
  ),
  utilities: (
    <svg {...iconProps}>
      <path d="M13.2 4.5L7.7 13h3.9l-1 6.5 5.6-8.6h-4l1-6.4z" fill="currentColor" />
    </svg>
  ),
  general: (
    <svg {...iconProps}>
      <rect x="5" y="5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5" y="13.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

const CATEGORIES: Array<{
  value: SpendCategory;
  label: string;
  sublabel: string;
  icon: keyof typeof icons;
}> = [
  { value: 'FUEL', label: 'Fuel', sublabel: 'Petrol, diesel, toll', icon: 'fuel' },
  { value: 'DINING', label: 'Dining', sublabel: 'Restaurants, delivery', icon: 'dining' },
  { value: 'TRAVEL', label: 'Travel', sublabel: 'Flights, hotels, trains', icon: 'travel' },
  { value: 'GROCERIES', label: 'Groceries', sublabel: 'Supermarkets, kirana', icon: 'groceries' },
  { value: 'SHOPPING', label: 'Shopping', sublabel: 'Online, retail', icon: 'shopping' },
  { value: 'ENTERTAINMENT', label: 'Entertainment', sublabel: 'OTT, events, gaming', icon: 'entertainment' },
  { value: 'UTILITIES', label: 'Utilities', sublabel: 'Bills, recharge, EMIs', icon: 'utilities' },
  { value: 'GENERAL', label: 'General', sublabel: 'Everything else', icon: 'general' },
];

export default function SpendCategoriesScreen() {
  const { state, progress, canAdvance, toggleSpendCategory, advance, back } = useQuestionnaireContext();

  return (
    <QuestionLayout
      question="What do you spend most on?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <p className={styles.instruction}>Pick up to 3 — order matters</p>

      <div className={styles.grid}>
        {CATEGORIES.map((category, index) => {
          const rankIndex = state.spendCategories.indexOf(category.value);
          const isSelected = rankIndex >= 0;

          return (
            <Tile
              key={category.value}
              variant="ranked"
              icon={icons[category.icon]}
              label={category.label}
              sublabel={category.sublabel}
              selected={isSelected}
              rank={isSelected ? rankIndex + 1 : undefined}
              animationDelay={(index + 1) * 80}
              onClick={() => toggleSpendCategory(category.value)}
            />
          );
        })}
      </div>
    </QuestionLayout>
  );
}


