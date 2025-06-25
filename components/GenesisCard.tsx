import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/flamecoin.module.css';
import tokenImg from '../src/assets/1.png';

export default function GenesisCard() {
  const [meta, setMeta] = useState<any>(null);
  const [owner, setOwner] = useState<string>("...");

  useEffect(() => {
    // Fetch metadata from IPFS
    fetch(METADATA_URL)
      .then(res => res.json())
      .then(setMeta)
      .catch(() => setMeta(null));

    // Fetch owner from Scroll Sepolia
    async function fetchOwner() {
      try {
        const provider = new ethers.JsonRpcProvider(SCROLL_SEPOLIA_RPC);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const ownerAddr = await contract.ownerOf(TOKEN_ID);
        setOwner(ownerAddr);
      } catch (err) {
        setOwner("Unknown");
      }
    }
    fetchOwner();
  }, []);

  if (!meta) return <div className={styles.card}>Loading...</div>;

  // Shorten address for display
  const shortOwner = owner !== "..." && owner !== "Unknown"
    ? owner.slice(0, 6) + "..." + owner.slice(-4)
    : owner;

  return (
    <div className={styles.card}>
      <img src={tokenImg} alt="FlameCoin #1" className={styles.cardImage} />
      <h3 className={styles.cardTitle}>Genesis Token #1</h3>
      <p className={styles.cardOwner}>Owner: Ryan (0xbdfe...3ae)</p>
      <p>
        <a
          href={METADATA_URL}
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
          View on Scroll
        </a>
      </p>
    </div>
  );
}
