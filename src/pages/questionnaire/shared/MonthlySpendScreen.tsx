import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { QuestionLayout } from '../../../components/layout';
import { useQuestionnaireContext } from '../../../context/useQuestionnaireContext';
import type { MonthlySpend } from '../../../types/questionnaire';
import styles from './MonthlySpendScreen.module.css';

const POINTS: Array<{ bracket: MonthlySpend; label: string; display: string; percent: number }> = [
  { bracket: 'S1', label: '₹0–10K/mo', display: '₹0–10K/mo', percent: 0 },
  { bracket: 'S2', label: '₹10–25K/mo', display: '₹10–25K/mo', percent: 25 },
  { bracket: 'S3', label: '₹25–50K/mo', display: '₹25–50K/mo', percent: 50 },
  { bracket: 'S4', label: '₹50–1L/mo', display: '₹50–1L/mo', percent: 75 },
  { bracket: 'S5', label: '₹1L+/mo', display: '₹1L+/mo', percent: 100 },
];

const findClosestPoint = (positionPercent: number) => {
  return POINTS.reduce((closest, point) =>
    Math.abs(point.percent - positionPercent) < Math.abs(closest.percent - positionPercent) ? point : closest
  );
};

export default function MonthlySpendScreen() {
  const { state, progress, canAdvance, setMonthlySpend, advance, back } = useQuestionnaireContext();
  const activeBracket = state.monthlySpendBracket ?? 'S3';
  const activePoint = useMemo(
    () => POINTS.find((point) => point.bracket === activeBracket) ?? POINTS[2],
    [activeBracket]
  );
  const [dragPercent, setDragPercent] = useState(POINTS[2].percent);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.monthlySpendBracket === null) {
      setMonthlySpend('S3');
    }
  }, [setMonthlySpend, state.monthlySpendBracket]);

  const getPercentFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return dragPercent;
    const rect = track.getBoundingClientRect();
    const relative = ((clientX - rect.left) / rect.width) * 100;
    return Math.max(0, Math.min(100, relative));
  }, [dragPercent]);

  const handlePointerDown = (clientX: number) => {
    setIsDragging(true);
    setDragPercent(getPercentFromClientX(clientX));
  };

  const handlePointerMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    setDragPercent(getPercentFromClientX(clientX));
  }, [getPercentFromClientX, isDragging]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const closest = findClosestPoint(dragPercent);
    setDragPercent(closest.percent);
    setMonthlySpend(closest.bracket);
  }, [dragPercent, isDragging, setMonthlySpend]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => handlePointerMove(event.clientX);
    const onMouseUp = () => handlePointerUp();
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches[0]) {
        handlePointerMove(event.touches[0].clientX);
      }
    };
    const onTouchEnd = () => handlePointerUp();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [handlePointerMove, handlePointerUp]);

  const displayPercent = isDragging ? dragPercent : activePoint.percent;

  return (
    <QuestionLayout
      question="How much do you spend on your card each month?"
      onBack={back}
      progress={progress}
      showContinue={canAdvance}
      onContinue={advance}
    >
      <p className={styles.instruction}>An estimate is fine</p>

      <div className={styles.value}>{activePoint.display}</div>

      <div className={styles.sliderWrap}>
        <div
          ref={trackRef}
          className={styles.track}
          onMouseDown={(event) => handlePointerDown(event.clientX)}
          onTouchStart={(event) => {
            if (event.touches[0]) {
              handlePointerDown(event.touches[0].clientX);
            }
          }}
        >
          <div className={styles.fill} style={{ width: `${displayPercent}%` }} />
          <div className={styles.thumb} style={{ left: `${displayPercent}%` }} />
          <button
            type="button"
            className={styles.thumbHitArea}
            style={{ left: `${displayPercent}%` }}
            aria-label="Adjust monthly spend"
            onMouseDown={(event) => handlePointerDown(event.clientX)}
            onTouchStart={(event) => {
              if (event.touches[0]) {
                handlePointerDown(event.touches[0].clientX);
              }
            }}
          />
        </div>

        <div className={styles.labels}>
          {POINTS.map((point) => (
            <span
              key={point.bracket}
              className={[styles.label, point.bracket === activeBracket ? styles.activeLabel : ''].filter(Boolean).join(' ')}
              style={{ left: `${point.percent}%` }}
            >
              {point.label}
            </span>
          ))}
        </div>
      </div>
    </QuestionLayout>
  );
}


