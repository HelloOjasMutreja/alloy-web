import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './RevealNumber.module.css';

interface RevealNumberProps {
  value: number;
  label?: string;
  sublabel?: string;
  triggered: boolean;
}

const indianCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  maximumFractionDigits: 0,
});

export function RevealNumber({ value, label, sublabel, triggered }: RevealNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [showLabel, setShowLabel] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showSubLabel, setShowSubLabel] = useState(false);
  const countFrameRef = useRef<number | null>(null);
  const timeoutRefs = useRef<number[]>([]);

  const formattedValue = useMemo(() => `₹${indianCurrencyFormatter.format(displayValue)}`, [displayValue]);

  useEffect(() => {
    if (countFrameRef.current !== null) {
      cancelAnimationFrame(countFrameRef.current);
      countFrameRef.current = null;
    }
    timeoutRefs.current.forEach((id) => window.clearTimeout(id));
    timeoutRefs.current = [];

    if (!triggered) {
      setDisplayValue(0);
      setShowLabel(false);
      setShowNumber(false);
      setShowSubLabel(false);
      return;
    }

    setShowLabel(true);

    const enterNumberTimer = window.setTimeout(() => {
      setShowNumber(true);

      const durationMs = 600;
      const start = performance.now();

      const tick = (timestamp: number) => {
        const elapsed = timestamp - start;
        const t = Math.min(1, elapsed / durationMs);
        const eased = 1 - (1 - t) ** 3;
        setDisplayValue(Math.round(value * eased));

        if (t < 1) {
          countFrameRef.current = requestAnimationFrame(tick);
        } else {
          countFrameRef.current = null;
        }
      };

      countFrameRef.current = requestAnimationFrame(tick);
    }, 400);

    const subLabelTimer = window.setTimeout(() => {
      setShowSubLabel(true);
    }, 1280);

    timeoutRefs.current.push(enterNumberTimer, subLabelTimer);

    return () => {
      if (countFrameRef.current !== null) {
        cancelAnimationFrame(countFrameRef.current);
      }
      timeoutRefs.current.forEach((id) => window.clearTimeout(id));
    };
  }, [triggered, value]);

  return (
    <div className={styles.container}>
      {label ? (
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 12 }}
          animate={showLabel ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.68, ease: [0.25, 0, 0, 1] }}
        >
          {label}
        </motion.div>
      ) : null}

      <motion.div
        className={styles.number}
        initial={{ opacity: 0, y: 8 }}
        animate={showNumber ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.48, ease: [0.25, 0, 0, 1] }}
      >
        {formattedValue}
      </motion.div>

      {sublabel ? (
        <motion.div
          className={styles.sublabel}
          initial={{ opacity: 0 }}
          animate={showSubLabel ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {sublabel}
        </motion.div>
      ) : null}
    </div>
  );
}

