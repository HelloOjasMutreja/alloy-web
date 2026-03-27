import styles from './ProgressTrack.module.css';

interface ProgressTrackProps {
  progress: number;
}

export function ProgressTrack({ progress }: ProgressTrackProps) {
  const safeProgress = Math.min(1, Math.max(0, progress));

  return (
    <div className={styles.track}>
      <div className={styles.fill} style={{ width: `${safeProgress * 100}%` }} />
    </div>
  );
}

