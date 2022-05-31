import { clusterApiUrl, PublicKey } from "@solana/web3.js"
import tiktok from './tiktok_clone.json'

export const SOLANA_HOST = clusterApiUrl('devnet')

export const TIKTOK_PROGRAM_ID = new PublicKey(
  "DpgUuHQ8SnRJG9oU3jzGJRfTcE6X36vafhcWKEX74PLB"
)

export const TIKTOK_IDL = tiktok