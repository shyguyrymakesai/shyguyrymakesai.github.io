import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/kamestyle.module.css';

const ABI = [
  'function tokenURI(uint256 tokenId) view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];

const CONTRACT_ADDRESS = '0x0820858CdF14c92a7105dA6f0fB4218454683f76';
const RPC_URL = import.meta.env.VITE_SCROLL_SEPOLIA_RPC || 'https://sepolia-rpc.scroll.io/';

function ipfsToHttp(url) {
  if (!url) return '';
  return url.startsWith('ipfs://') ? url.replace('ipfs://', 'https://ipfs.io/ipfs/') : url;
}

export default function KameGallery() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchTokens() {
      try {
        const provider = new ethers.JsonRpcProvider(RPC_URL);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const events = await contract.queryFilter(contract.filters.Transfer(), 0, 'latest');
        const ids = Array.from(new Set(events.map(ev => ev.args?.tokenId.toString())));
        const metas = await Promise.all(ids.map(async id => {
          try {
            const uri = await contract.tokenURI(id);
            const res = await fetch(ipfsToHttp(uri));
            const meta = await res.json();
            return { id, meta: { ...meta, image: ipfsToHttp(meta.image) } };
          } catch (err) {
            console.error(`Error fetching token ${id}`, err);
            return null;
          }
        }));
        setTokens(metas.filter(Boolean));
      } catch (err) {
        console.error('Error loading tokens', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, []);

  const prev = () => setIndex((index - 1 + tokens.length) % tokens.length);
  const next = () => setIndex((index + 1) % tokens.length);

  if (loading) return <p className={styles.section}>Loading gallery...</p>;
  if (!tokens.length) {
    return (
      <section className={styles.section}>
        <p>No glyphs minted yet.</p>
        <a href="/" className={styles.homeButton}>Return Home</a>
      </section>
    );
  }

  const EXPLORER_URL = `https://sepolia.etherscan.io/token/${CONTRACT_ADDRESS}?a=${tokens[index].id}`;

  return (
    <section className={styles.section}>
      <h2>Minted Glyphs</h2>
      <div className={styles.carousel} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={prev} className={styles.carouselButton}>‹</button>
        <div
          className={styles.card}
          key={tokens[index].id}
          style={{ cursor: 'pointer', maxWidth: '500px', margin: '0 auto' }}
        >
          <img
            src={tokens[index].meta.image}
            alt={tokens[index].meta.name}
            className={styles.cardImage}
            style={{ width: '100%', height: 'auto', borderRadius: '1rem' }}
          />
          <h3 className={styles.cardTitle}>{tokens[index].meta.name}</h3>
          <p className={styles.cardOwner}>Token #{tokens[index].id}</p>
          {tokens[index].meta.description && (
            <p className={styles.cardDescription}>{tokens[index].meta.description}</p>
          )}
          {Array.isArray(tokens[index].meta.attributes) && (
            <ul>
              {tokens[index].meta.attributes.map(attr => (
                <li key={attr.trait_type}>
                  <strong>{attr.trait_type}:</strong> {attr.value}
                </li>
              ))}
            </ul>
          )}
          <p>
            <a href={EXPLORER_URL} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
              View on Explorer
            </a>
          </p>
        </div>
        <button onClick={next} className={styles.carouselButton}>›</button>
      </div>
      <a href="/" className={styles.homeButton}>Return Home</a>
    </section>
  );
}

