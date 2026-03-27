import { useEffect, useMemo, useState } from 'react';
import { Nav } from '../../components/layout';
import { RevealNumber } from '../../components/ui';
import { formatRupee } from '../../lib/format';
import type { RecommendedCard, RecommendationResponse } from '../../types/results';
import styles from './ResultB.module.css';

interface ResultBProps {
  result: RecommendationResponse;
}

function inr(value: number | null) {
  return formatRupee(value ?? 0);
}

function feeNote(card: RecommendedCard) {
  if (card.annual_fee === 0) {
    return 'No annual fee';
  }
  const monthlyBreakEven = Math.round(card.fee_waiver_spend / 12 / 1000);
  return `${formatRupee(card.annual_fee)}/yr annual fee · pays for itself above ₹${monthlyBreakEven}K/mo`;
}

function CardResult({ card, visible }: { card: RecommendedCard; visible: boolean }) {
  return (
    <article className={[styles.card, visible ? styles.visible : ''].filter(Boolean).join(' ')}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.bank}>{card.bank}</div>
          <div className={styles.name}>{card.card_name}</div>
        </div>
        <div>
          <div className={styles.netLabel}>NET VALUE</div>
          <div className={styles.netValue}>{inr(card.net_annual_value)}</div>
        </div>
      </div>
      <hr className={styles.divider} />
      <p className={styles.fits}>{card.why_it_fits}</p>
      <div className={styles.noteLabel}>WORTH NOTING</div>
      <p className={styles.noteText}>{card.honest_weakness}</p>
      <p className={styles.feeNote}>{feeNote(card)}</p>
    </article>
  );
}

export default function ResultB({ result }: ResultBProps) {
  const [showFraming, setShowFraming] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const isStay = result.honest_verdict === 'STAY' || result.gap_sentiment === 'POSITIVE';

  useEffect(() => {
    const t0 = window.setTimeout(() => setShowFraming(true), 0);
    const t1 = window.setTimeout(() => setShowNumber(true), 400);
    const t2 = window.setTimeout(() => setShowComparison(true), 1400);
    const t3 = window.setTimeout(() => setShowRecommendation(true), 1600);

    return () => {
      [t0, t1, t2, t3].forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const framing = useMemo(() => {
    if (isStay) {
      return 'Your current card is actually a good fit.';
    }
    return "You're leaving this much on the table, every year.";
  }, [isStay]);

  return (
    <main className={styles.page}>
      <Nav mode="landing" />
      <section className={styles.content}>
        <p className={[styles.framing, showFraming ? styles.visible : ''].filter(Boolean).join(' ')}>
          {framing}
        </p>

        <div className={styles.revealWrap}>
          <RevealNumber
            value={isStay ? 0 : result.annual_gap ?? 0}
            triggered={showNumber}
            sublabel={
              isStay
                ? "The difference is small — here's how to get more from your current card."
                : undefined
            }
          />
        </div>

        <div className={[styles.compare, showComparison ? styles.visible : ''].filter(Boolean).join(' ')}>
          <div className={styles.compareCol}>
            <p className={styles.compareLabel}>YOUR CARD</p>
            <p className={styles.compareName}>Current card</p>
            <p className={styles.compareValue}>{inr(result.current_card_value)}/yr</p>
          </div>
          <div className={styles.compareDivider} />
          <div className={styles.compareCol}>
            <p className={styles.compareLabel}>ALTERNATIVE</p>
            <p className={styles.compareName}>{result.recommendations[0]?.card_name ?? 'Best alternative'}</p>
            <p className={[styles.compareValue, styles.compareValueStrong].join(' ')}>
              {inr(result.best_alternative_value)}/yr
            </p>
          </div>
        </div>

        {!isStay ? (
          <>
            <p className={styles.sectionLabel}>RECOMMENDED SWITCH</p>
            {result.recommendations[0] ? (
              <CardResult card={result.recommendations[0]} visible={showRecommendation} />
            ) : null}
          </>
        ) : (
          <section className={[styles.tips, showRecommendation ? styles.visible : ''].filter(Boolean).join(' ')}>
            <p className={styles.sectionLabel}>HOW TO GET MORE FROM IT</p>
            <ul className={styles.tipList}>
              <li>Use it for [primary spend category] every time</li>
              <li>Check if you qualify for the annual fee waiver</li>
              <li>Link recurring bills to build rewards passively</li>
            </ul>
          </section>
        )}
      </section>
    </main>
  );
}

