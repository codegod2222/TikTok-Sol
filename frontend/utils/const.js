import { clusterApiUrl, PublicKey } from "@solana/web3.js"
import tiktok from './tiktok_clone.json'

export const SOLANA_HOST = clusterApiUrl('devnet')

export const TIKTOK_PROGRAM_ID = new PublicKey(
  "62C9diNeSgC75F6hvXFbCWG5BuTa1XPEMLkMnoJNkd9F"
)

export const TIKTOK_IDL = tiktok