import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/flamecoin.module.css';

const ABI = [
  'function tokenURI(uint256 tokenId) view returns (string)',
  'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)'
];

const CONTRACT_ADDRESS = '0x2De7871238a0BB8A2eB3b99be26825cEdDA8aB77';
const SCROLL_SEPOLIA_RPC = 'https://sepolia-rpc.scroll.io/';

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
        const provider = new ethers.JsonRpcProvider(SCROLL_SEPOLIA_RPC);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const filter = contract.filters.Transfer(ethers.ZeroAddress);
        const logs = await provider.getLogs({
          address: CONTRACT_ADDRESS,
          topics: filter.topics,
          fromBlock: 0,
          toBlock: 'latest'
        });
        const ids = logs.map((log: any) =>
          contract.interface.parseLog(log).args.tokenId.toString()
        );
        const uniqueIds = Array.from(new Set(ids));

        const metas = await Promise.all(
          uniqueIds.map(async (id) => {
            try {
              const uri = await contract.tokenURI(id);
              const res = await fetch(ipfsToHttp(uri));
              const data = await res.json();
              return { id, meta: data } as TokenInfo;
            } catch {
              return null;
            }
          })
        );
        setTokens(metas.filter(Boolean) as TokenInfo[]);
      } catch {
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
    return <p className={styles.section}>No FlameCoins minted yet.</p>;
  }

  return (
    <section className={styles.section}>
      <h2>Minted FlameCoins</h2>
      <div className={styles.gallery}>
        {tokens.map((t) => (
          <div key={t.id} className={styles.card}>
            <img
              src={ipfsToHttp(t.meta.image)}
              alt={t.meta.name}
              className={styles.cardImage}
            />
            <h3 className={styles.cardTitle}>{t.meta.name}</h3>
            <p className={styles.cardOwner}>Token #{t.id}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlameGallery;
