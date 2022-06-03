import { clusterApiUrl, PublicKey } from "@solana/web3.js"
import tiktok from './tiktok_clone.json'

export const SOLANA_HOST = clusterApiUrl('devnet')

export const TIKTOK_PROGRAM_ID = new PublicKey(
  "FK9pi2rvvfGzKGKTkPy7ij1HxGaQdjykUhenwoxo83Bo"
)

export const TIKTOK_IDL = tiktok