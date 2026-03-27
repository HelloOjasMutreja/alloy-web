import { useEffect, useState } from 'react';
import { Nav } from '../../components/layout';
import type { RecommendedCard, RecommendationResponse } from '../../types/results';
import styles from './ResultA.module.css';

interface ResultAProps {
  result: RecommendationResponse;
}

const currencyFormatter = new Intl.NumberFormat('en-IN');

function formatInr(value: number) {
  return `₹${currencyFormatter.format(value)}`;
}

function formatFeeNote(card: RecommendedCard) {
  if (card.annual_fee === 0) {
    return 'No annual fee';
  }

  const monthlyBreakEven = Math.round(card.fee_waiver_spend / 12 / 1000);
  return `${formatInr(card.annual_fee)}/yr annual fee · pays for itself above ₹${monthlyBreakEven}K/mo`;
}

function CardResult({ card, index }: { card: RecommendedCard; index: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), index * 120);
    return () => window.clearTimeout(timer);
  }, [index]);

  return (
    <article className={[styles.card, visible ? styles.cardVisible : '', index === 0 ? styles.primaryCard : ''].filter(Boolean).join(' ')}>
      {index === 0 ? <div className={styles.bestMatch}>BEST MATCH</div> : null}

      <div className={styles.headerRow}>
        <div>
          <div className={styles.bank}>{card.bank}</div>
          <div className={styles.name}>{card.card_name}</div>
        </div>
        <div>
          <div className={styles.netLabel}>NET VALUE</div>
          <div className={styles.netValue}>{formatInr(card.net_annual_value)}</div>
        </div>
      </div>

      <hr className={styles.divider} />

      <p className={styles.fits}>{card.why_it_fits}</p>

      <div className={styles.noteLabel}>WORTH NOTING</div>
      <p className={styles.noteText}>{card.honest_weakness}</p>

      <p className={styles.feeNote}>{formatFeeNote(card)}</p>
    </article>
  );
}

export default function ResultA({ result }: ResultAProps) {
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeadingVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <main className={styles.page}>
      <Nav mode="landing" />
      <section className={styles.content}>
        <header className={[styles.heading, headingVisible ? styles.headingVisible : ''].filter(Boolean).join(' ')}>
          <p className={styles.label}>BASED ON YOUR SPENDING</p>
          <h1 className={styles.headline}>{"Here's what works\nfor how you spend."}</h1>
        </header>

        <div className={styles.list}>
          {result.recommendations.map((card, index) => (
            <CardResult key={card.card_id} card={card} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}

