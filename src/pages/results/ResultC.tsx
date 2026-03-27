import { useEffect, useState } from 'react';
import { Nav } from '../../components/layout';
import { formatRupee } from '../../lib/format';
import type { RecommendedCard, RecommendationResponse } from '../../types/results';
import styles from './ResultC.module.css';

interface ResultCProps {
  result: RecommendationResponse;
}

const coveredCategories = ['Dining', 'Groceries', 'Shopping'];
const gapCategories = ['Travel', 'Utilities', 'Fuel'];
function feeNote(card: RecommendedCard) {
  if (card.annual_fee === 0) {
    return 'No annual fee';
  }
  const monthlyBreakEven = Math.round(card.fee_waiver_spend / 12 / 1000);
  return `${formatRupee(card.annual_fee)}/yr annual fee · pays for itself above ₹${monthlyBreakEven}K/mo`;
}

function CardResult({ card }: { card: RecommendedCard }) {
  return (
    <article className={styles.card}>
      <div className={styles.headerRow}>
        <div>
          <div className={styles.bank}>{card.bank}</div>
          <div className={styles.name}>{card.card_name}</div>
        </div>
        <div>
          <div className={styles.netLabel}>NET VALUE</div>
          <div className={styles.netValue}>{formatRupee(card.net_annual_value)}</div>
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

export default function ResultC({ result }: ResultCProps) {
  const [showCoverage, setShowCoverage] = useState(false);
  const [showAddition, setShowAddition] = useState(false);

  useEffect(() => {
    const c = window.setTimeout(() => setShowCoverage(true), 120);
    const a = window.setTimeout(() => setShowAddition(true), 280);
    return () => {
      window.clearTimeout(c);
      window.clearTimeout(a);
    };
  }, []);

  return (
    <main className={styles.page}>
      <Nav mode="landing" />
      <section className={styles.content}>
        <p className={styles.label}>YOUR STACK ANALYSIS</p>
        <h1 className={styles.headline}>{"Here's where your\ncombination falls short."}</h1>

        <div className={[styles.coverage, showCoverage ? styles.visible : ''].filter(Boolean).join(' ')}>
          <div className={[styles.box, styles.covered].join(' ')}>
            <p className={styles.boxLabel}>COVERED WELL</p>
            <ul className={styles.list}>
              {coveredCategories.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.dot} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className={[styles.box, styles.gaps].join(' ')}>
            <p className={styles.boxLabel}>GAP</p>
            <ul className={styles.list}>
              {gapCategories.map((item) => (
                <li key={item} className={styles.item}>
                  <span className={styles.dot} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={[styles.additionWrap, showAddition ? styles.visible : ''].filter(Boolean).join(' ')}>
          <p className={styles.sectionLabel}>RECOMMENDED ADDITION</p>
          <h2 className={styles.sectionHeadline}>One card fills most of these gaps.</h2>
          {result.recommendations[0] ? <CardResult card={result.recommendations[0]} /> : null}
        </div>
      </section>
    </main>
  );
}

