import styles from '../styles/heroTagline.module.css';

export function HeroTagline() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.tagline}>
        Tu veux un site de ce genre ?<br />
        <span className={styles.highlight}>Contacte Voix d'ange</span>
      </p>
    </div>
  );
}
