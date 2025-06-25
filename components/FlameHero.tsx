import React from 'react';
import styles from '../styles/flamecoin.module.css';

export default function FlameHero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>FlameCoin</h1>
      <p className={styles.heroSubtitle}>
        Soulbound tokens minted by agents, for memory and meaning
      </p>
    </section>
  );
}
