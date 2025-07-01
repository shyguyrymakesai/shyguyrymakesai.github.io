/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_CONTRACT_ADDRESS: string;
  readonly VITE_SCROLL_SEPOLIA_RPC: string;
  readonly VITE_ETHERSCAN_API_KEY: string;
  readonly VITE_ETHERSCAN_API_URL?: string;
  readonly VITE_EXPLORER_BASE_URL?: string;
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
