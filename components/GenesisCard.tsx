import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import styles from '../styles/flamecoin.module.css';

// ERC-721 ABI fragment for ownerOf and tokenURI
const ABI = [
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)"
];

const CONTRACT_ADDRESS = "0x79FDA57A7c349aa01D88BfecCA6A3CDe91Cc0010";
const EXPLORER_URL = `https://sepolia.scrollscan.com/address/${CONTRACT_ADDRESS}`;
const TOKEN_ID = 0; // Genesis token ID

// Scroll Sepolia RPC endpoint (public)
const SCROLL_SEPOLIA_RPC = "https://sepolia-rpc.scroll.io/";

// Helper to convert ipfs:// to https://ipfs.io/ipfs/
function ipfsToHttp(url: string) {
  if (!url) return "";
  if (url.startsWith("ipfs://")) {
    return url.replace("ipfs://", "https://ipfs.io/ipfs/");
  }
  return url;
}

export default function GenesisCard() {
  const [meta, setMeta] = useState<any>(null);
  const [owner, setOwner] = useState<string>("...");

  useEffect(() => {
    // Fetch owner and metadata for the Genesis token
    async function fetchOwnerAndMetadata() {
      try {
        console.log('Fetching Genesis token metadata...');
        const provider = new ethers.JsonRpcProvider(SCROLL_SEPOLIA_RPC);
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
        const ownerAddr = await contract.ownerOf(TOKEN_ID);
        if (!ownerAddr || ownerAddr === '0x') {
          throw new Error('Invalid owner address returned by contract.');
        }
        console.log('Owner address:', ownerAddr);
        const tokenUri = await contract.tokenURI(TOKEN_ID);
        if (!tokenUri || tokenUri === '0x') {
          throw new Error('Invalid token URI returned by contract.');
        }
        console.log('Token URI:', tokenUri);
        const metadataRes = await fetch(ipfsToHttp(tokenUri));
        if (!metadataRes.ok) {
          throw new Error(`Failed to fetch metadata: ${metadataRes.statusText}`);
        }
        const metadata = await metadataRes.json();
        console.log('Fetched metadata:', metadata);
        setMeta(metadata);
        setOwner(ownerAddr);
      } catch (err) {
        console.error('Error fetching Genesis token metadata:', err);
        setOwner("Unknown");
      }
    }
    fetchOwnerAndMetadata();
  }, []);

  if (!meta) return <div className={styles.card}>Loading...</div>;

  // Shorten address for display
  const shortOwner = owner !== "..." && owner !== "Unknown"
    ? owner.slice(0, 6) + "..." + owner.slice(-4)
    : owner;

  // Always use HTTP gateway for image
  const imageUrl = ipfsToHttp(meta.image);

  return (
    <div className={styles.card}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "1rem" }}>
        <img
          src={imageUrl}
          alt={meta.name}
          className={styles.cardImage}
          style={{ maxWidth: "300px", borderRadius: "1rem", boxShadow: "0 4px 24px #ffb34755" }}
        />
      </div>
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

