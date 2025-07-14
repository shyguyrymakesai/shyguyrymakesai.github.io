import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/flamecoin.module.css';

// Add ImportMetaEnv type declaration for Vite environment variables
interface ImportMetaEnv {
  readonly VITE_CONTRACT_ADDRESS?: string;
  readonly VITE_SCROLL_SEPOLIA_RPC?: string;
  readonly VITE_ETHERSCAN_API_KEY?: string;
  readonly VITE_ETHERSCAN_API_URL?: string;
}

// Extend the ImportMeta interface globally for Vite
declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

const ABI = [
  'function tokenURI(uint256 tokenId) view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x79FDA57A7c349aa01D88BfecCA6A3CDe91Cc0010';
const SCROLL_SEPOLIA_RPC = import.meta.env.VITE_SCROLL_SEPOLIA_RPC || 'https://sepolia-rpc.scroll.io/';

function ipfsToHttp(url: string): string {
  if (!url) return '';
  if (url.startsWith('ipfs://')) {
    return url.replace('ipfs://', 'https://ipfs.io/ipfs/');
  }
  return url;
}

interface TokenInfo {
  id: string;
  meta: any;
}

const FlameGallery: React.FC = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchTokens() {
      try {
        console.log('Fetching tokens via RPC events...');
        const provider = new ethers.JsonRpcProvider(SCROLL_SEPOLIA_RPC);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const events = await contract.queryFilter(contract.filters.Transfer(), 0, 'latest');
        const uniqueIds = Array.from(new Set(events.map((ev: any) => ev.args?.tokenId.toString())));
        console.log('Found token IDs:', uniqueIds);

        const metas = await Promise.all(
          uniqueIds.map(async (id: string) => {
            try {
              const tokenUri = await contract.tokenURI(id);
              const metadataRes = await fetch(ipfsToHttp(tokenUri));
              const metadata = await metadataRes.json();
              const ipfsImage = ipfsToHttp(metadata.image);
              return { id, meta: { ...metadata, image: ipfsImage } };
            } catch (err) {
              console.error(`Error fetching metadata for token ${id}:`, err);
              return null;
            }
          })
        );
        setTokens(metas.filter(Boolean) as TokenInfo[]);
      } catch (err) {
        console.error('Error fetching tokens:', err);
        setTokens([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, []);

  const prev = () => setIndex((index - 1 + tokens.length) % tokens.length);
  const next = () => setIndex((index + 1) % tokens.length);

  const enlargeImage = (imageUrl: string) => {
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(
        `<img src="${imageUrl}" style="width: 100%; height: auto; display: block; margin: auto;" />`
      );
    }
  };

  const EXPLORER_BASE_URL = "https://sepolia.etherscan.io/token";
  const EXPLORER_URL = `${EXPLORER_BASE_URL}/${CONTRACT_ADDRESS}`;

  if (loading) {
    return <p className={styles.section}>Loading gallery...</p>;
  }

  if (!tokens.length) {
    return (
      <section className={styles.section}>
        <p>No FlameCoins minted yet.</p>
        <a href="/" className={styles.homeButton}>Return Home</a>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2>Minted FlameCoins</h2>
      <div className={styles.carousel} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={prev} className={styles.carouselButton}>‹</button>
        <div
          className={styles.card}
          key={tokens[index].id}
          style={{ cursor: 'pointer', maxWidth: '500px', margin: '0 auto' }}
          onClick={() => enlargeImage(tokens[index].meta.image)}
        >
          <img
            src={tokens[index].meta.image}
            alt={tokens[index].meta.name}
            className={styles.cardImage}
            style={{ width: '100%', height: 'auto', borderRadius: '1rem' }}
          />
          <h3 className={styles.cardTitle}>{tokens[index].meta.name}</h3>
          <p className={styles.cardOwner}>Token #{tokens[index].id}</p>
          <p>
            <a
              href={EXPLORER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardLink}
            >
              View on Explorer
            </a>
          </p>
        </div>
        <button onClick={next} className={styles.carouselButton}>›</button>
      </div>
      <a href="/" className={styles.homeButton}>Return Home</a>
    </section>
  );
};

export default FlameGallery;
