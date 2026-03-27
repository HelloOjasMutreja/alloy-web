import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useAnimationEntry } from '../../hooks/useAnimationEntry';
import { Button } from '../ui';
import { Nav } from './Nav';
import styles from './QuestionLayout.module.css';

interface QuestionLayoutProps {
  question: string;
  onBack?: () => void;
  progress: number;
  children: ReactNode;
  showContinue?: boolean;
  onContinue?: () => void;
  continueLabel?: string;
  isLoading?: boolean;
  showBack?: boolean;
  showProgress?: boolean;
}

export function QuestionLayout({
  question,
  onBack,
  progress,
  children,
  showContinue = false,
  onContinue,
  continueLabel = 'Continue →',
  isLoading = false,
  showBack = true,
  showProgress = true,
}: QuestionLayoutProps) {
  const { style } = useAnimationEntry(0);

  return (
    <div className={styles.page}>
      <Nav mode="flow" onBack={onBack} progress={progress} showBack={showBack} showProgress={showProgress} />

      <main className={styles.content}>
        <h1 className={styles.question} style={style}>
          {question}
        </h1>

        {children}

        <AnimatePresence>
          {showContinue ? (
            <motion.div
              key="continue"
              className={styles.continueWrap}
              initial={{ opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4, transition: { duration: 0.16, ease: 'easeIn' } }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              <Button
                variant="primary"
                size="lg"
                className={styles.continueButton}
                onClick={onContinue}
                disabled={isLoading}
              >
                {continueLabel}
              </Button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>
    </div>
  );
}

