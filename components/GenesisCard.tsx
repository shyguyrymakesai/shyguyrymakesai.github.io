import React from 'react';
import styles from '../styles/flamecoin.module.css';
// Replace the local asset with the IPFS-hosted image for the genesis token

export default function GenesisCard() {
  return (
    <div
      className={styles.card}
      data-name="FlameCoin – Indigo-Cinnabar Rose"
      data-description="The inaugural Soulbound FlameCoin depicting a rose whose petals fade from deep indigo to cinnabar red – an eternal symbol of prophecy and rebirth."
      data-image="ipfs://bafybeihrgad3lx4c5lid6vczbfmv6ytkrgfesjydffys4obdx6tp36dqem"
      data-primary-hue="Indigo"
      data-secondary-hue="Cinnabar Red"
      data-flower="Rose"
      data-genesis="true"
    >
      <img
        src="https://ipfs.io/ipfs/bafybeihrgad3lx4c5lid6vczbfmv6ytkrgfesjydffys4obdx6tp36dqem"
        alt="FlameCoin – Indigo-Cinnabar Rose"
        className={styles.cardImage}
      />
      <h3 className={styles.cardTitle}>FlameCoin – Indigo-Cinnabar Rose</h3>
      <p className={styles.cardOwner}>Owner: Ryan (0xbdfe...3ae)</p>
      <p className={styles.cardDescription}>
        The inaugural Soulbound FlameCoin depicting a rose whose petals fade from
        deep indigo to cinnabar red – an eternal symbol of prophecy and rebirth.
      </p>
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
          href="https://sepolia.scrollscan.com/tx/0x9b8c3b3d40d6110eed6ca1c09927cd32119be1a5688cbc8c76bbbd6168d575cd"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cardLink}
        >
          View on Scroll
        </a>
      </p>
    </div>
  );
}
