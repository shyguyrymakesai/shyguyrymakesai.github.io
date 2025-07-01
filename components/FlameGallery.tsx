import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/flamecoin.module.css';

// Add ImportMetaEnv type declaration for Vite environment variables
interface ImportMetaEnv {
  readonly VITE_CONTRACT_ADDRESS?: string;
  readonly VITE_SCROLL_SEPOLIA_RPC?: string;
  readonly VITE_ETHERSCAN_API_KEY?: string;
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
const ETHERSCAN_API_KEY = import.meta.env.VITE_ETHERSCAN_API_KEY || 'K1KCBYVM5T5RVQT5W8IRY74T8HFN92IYSK';

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

  useEffect(() => {
    async function fetchTokens() {
      try {
        console.log('Fetching tokens from Etherscan API...');
        const provider = new ethers.JsonRpcProvider(SCROLL_SEPOLIA_RPC);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

        const response = await fetch(
          `https://api-sepolia.etherscan.io/api?module=account&action=tokennfttx&contractaddress=${CONTRACT_ADDRESS}&apikey=${ETHERSCAN_API_KEY}`
        );
        const data = await response.json();
        console.log('Etherscan API response:', data);

        if (data.status === "1" && data.result) {
          const uniqueIds = Array.from(new Set(data.result.map((tx) => tx.tokenID)));
          console.log('Unique token IDs:', uniqueIds);

          const metas = await Promise.all(
            uniqueIds.map(async (id: string) => {
              try {
                console.log(`Fetching metadata for token ID ${id}...`);
                const tokenUri = await contract.tokenURI(id);
                if (!tokenUri || tokenUri === '0x') {
                  throw new Error(`Invalid token URI returned by contract for token ID ${id}.`);
                }
                console.log(`Token URI for ID ${id}:`, tokenUri);
                const metadataRes = await fetch(ipfsToHttp(tokenUri));
                if (!metadataRes.ok) {
                  throw new Error(`Failed to fetch metadata for token ${id}: ${metadataRes.statusText}`);
                }
                const metadata = await metadataRes.json();
                console.log(`Fetched metadata for token ${id}:`, metadata);
                const ipfsImage = ipfsToHttp(metadata.image);
                return { id, meta: { ...metadata, image: ipfsImage } };
              } catch (err) {
                console.error(`Error fetching metadata for token ${id}:`, err);
                return null;
              }
            })
          );
          setTokens(metas.filter(Boolean) as TokenInfo[]);
        } else {
          console.warn('No tokens found or API response invalid.');
          setTokens([]);
        }
      } catch (err) {
        console.error('Error fetching tokens:', err);
        setTokens([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTokens();
  }, []);

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
      <div className={styles.gallery}>
        {tokens.map((t) => (
          <div key={t.id} className={styles.card}>
            <img
              src={t.meta.image}
              alt={t.meta.name}
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>{t.meta.name}</h3>
            <p className={styles.cardOwner}>Token #{t.id}</p>
          </div>
        ))}
      </div>
      <a href="/" className={styles.homeButton}>Return Home</a>
    </section>
  );
};

export default FlameGallery;
