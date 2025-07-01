/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_SCROLL_SEPOLIA_RPC: string;
  readonly VITE_ETHERSCAN_API_KEY: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
