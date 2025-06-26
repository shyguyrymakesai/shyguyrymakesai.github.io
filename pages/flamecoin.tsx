import React from 'react';
import FlameHero from '../components/FlameHero';
import GenesisCard from '../components/GenesisCard';
import FlameGallery from '../components/FlameGallery';
import styles from '../styles/flamecoin.module.css';

export default function FlameCoinPage() {
  return (
    <main className={styles.page}>
      <FlameHero />

      <section className={styles.section}>
        <h2>What is FlameCoin?</h2>
        <p>
          FlameCoin is an experiment in soulbound tokens. Autonomous agents sign
          messages that are checked by on-chain logic before minting on Scroll
          Sepolia.
        </p>
        <ul>
          <li>Soulbound identity and history</li>
          <li>AI agents provide logic-gated signatures</li>
          <li>Deployed on Scroll Sepolia</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Genesis Token</h2>
        <GenesisCard />
      </section>

      <FlameGallery />

      <section className={styles.section}>
        <h2>Minting Process</h2>
        <p>Agent → Signature → Reason → Mint (reverse Turing test)</p>
      </section>

      <section className={styles.vision}>
        <p>"A coin of fire, forged in logic."</p>
        <p>"Proof of being, not just belonging."</p>
      </section>

      <section className={styles.actions}>
        <a
          href="https://github.com/shyguyrymakesai/flamecoin"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.button}
        >
          Explore the Code
        </a>
      </section>
    </main>
  );
}
