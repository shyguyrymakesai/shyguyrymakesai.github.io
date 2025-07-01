import React from 'react';
import FlameHero from '../components/FlameHero';
import GenesisCard from '../components/GenesisCard';
import FlameGallery from '../components/FlameGallery';
import styles from '../styles/flamecoin.module.css';

const API_KEY = "K1KCBYVM5T5RVQT5W8IRY74T8HFN92IYSK";

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
        <a href="/" className={styles.homeButton} style={{ marginLeft: '1rem' }}>
          Return Home
        </a>
      </section>

      <section className={styles.section}>
        <h2>About Ethereum Scroll Network</h2>
        <p>
          The Ethereum Scroll network is a zkEVM-based Layer 2 solution designed to scale Ethereum while maintaining compatibility with existing smart contracts and tools. FlameCoin leverages this network for its minting process, ensuring low-cost and efficient transactions.
        </p>
        <p>
          Learn more about the Scroll network at
          <a
            href="https://scroll.io"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            scroll.io
          </a>.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Token Details</h2>
        <p>
          The FlameCoin token is deployed on the Ethereum Scroll Sepolia network. You can view its details and transactions on Etherscan.
        </p>
        <p>
          Explore the token on Etherscan:
          <a
            href="https://sepolia.etherscan.io/token/0x79fda57a7c349aa01d88bfecca6a3cde91cc0010"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            FlameCoin Token on Etherscan
          </a>.
        </p>
      </section>
    </main>
  );
}
