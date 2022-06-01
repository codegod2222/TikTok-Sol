import { clusterApiUrl, PublicKey } from "@solana/web3.js"
import tiktok from './tiktok_clone.json'

export const SOLANA_HOST = clusterApiUrl('devnet')

export const TIKTOK_PROGRAM_ID = new PublicKey(
  "yuHZXw3twrwRUvxmZA2p11u2JTVdjAc84r4HpmbxRoa"
)

export const TIKTOK_IDL = tiktok