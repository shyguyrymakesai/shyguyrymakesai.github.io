import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/flamecoin.module.css';

// ERC-721 ABI fragment for ownerOf and tokenURI
const ABI = [
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

const CONTRACT_ADDRESS = "0x2De7871238a0BB8A2eB3b99be26825cEdDA8aB77";
const EXPLORER_URL = `https://sepolia.scrollscan.com/address/${CONTRACT_ADDRESS}`;
const METADATA_URL = "https://ipfs.io/ipfs/bafkreidaeuwzeqilabl3i6peor4mn3tam4nixpyxz6q23m32dbnqgzg3di";
const TOKEN_ID = 1;

// Scroll Sepolia RPC endpoint (public)
const SCROLL_SEPOLIA_RPC = "https://sepolia-rpc.scroll.io/";

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
      <img src={meta.image} alt={meta.name} className={styles.cardImage} />
      <h3 className={styles.cardTitle}>{meta.name}</h3>
      <p className={styles.cardOwner}>Owner: {shortOwner}</p>
      <p>{meta.description}</p>
      <ul>
        {meta.attributes?.map((attr: any) => (
          <li key={attr.trait_type}>
            <strong>{attr.trait_type}:</strong> {attr.value}
          </li>
        ))}
      </ul>
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
          href={EXPLORER_URL}
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
