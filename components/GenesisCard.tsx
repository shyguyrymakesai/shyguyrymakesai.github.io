import React from 'react';
import styles from '../styles/flamecoin.module.css';
import tokenImg from '../src/assets/1.png';

export default function GenesisCard() {
  return (
    <div className={styles.card}>
      <img src={tokenImg} alt="FlameCoin #1" className={styles.cardImage} />
      <h3 className={styles.cardTitle}>Genesis Token #1</h3>
      <p className={styles.cardOwner}>Owner: Ryan (0xbdfe...3ae)</p>
      <p>
        <a
          href="/metadata/1"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          Metadata
        </a>
        {' '}|{' '}
        <a
          href="https://sepolia.scrollscan.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          View on Explorer
        </a>
      </p>
    </div>
  );
}
