import type { ReactNode } from 'react';
import styles from './Tile.module.css';

interface CommonTileProps {
  label: string;
  sublabel?: string;
  selected?: boolean;
  onClick?: () => void;
  rank?: number;
  animationDelay?: number;
}

interface IconTileProps extends CommonTileProps {
  variant: 'icon';
  icon: ReactNode;
}

interface TapCardTileProps extends CommonTileProps {
  variant: 'tap-card';
}

interface RankedTileProps extends CommonTileProps {
  variant: 'ranked';
  icon: ReactNode;
}

type TileProps = IconTileProps | TapCardTileProps | RankedTileProps;

export function Tile(props: TileProps) {
  const {
    variant,
    label,
    sublabel,
    selected = false,
    onClick,
    rank,
    animationDelay = 0,
  } = props;

  const variantClass =
    variant === 'tap-card' ? styles.tapCard : variant === 'ranked' ? styles.ranked : styles.icon;
  const classNames = [styles.tile, variantClass, selected ? styles.selected : '']
    .filter(Boolean)
    .join(' ');

  const triggerClick = () => {
    onClick?.();
  };

  return (
    <button
      type="button"
      onClick={triggerClick}
      aria-selected={selected}
      className={classNames}
      style={{ animationDelay: `${animationDelay}ms` }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          triggerClick();
        }
      }}
    >
      {(variant === 'icon' || variant === 'ranked') && 'icon' in props ? (
        <div className={styles.iconWrap}>{props.icon}</div>
      ) : null}

      <div className={styles.label}>{label}</div>
      {sublabel ? (
        <div
          className={[
            styles.sublabel,
            variant === 'tap-card' ? styles.tapSubLabel : styles.iconSubLabel,
          ].join(' ')}
        >
          {sublabel}
        </div>
      ) : null}

      {variant === 'ranked' && selected && typeof rank === 'number' ? (
        <span className={styles.badge}>{rank}</span>
      ) : null}
    </button>
  );
}

