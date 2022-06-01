import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";

const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const { BN, web3 } = anchor
const { SystemProgram } = web3

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId
}

const useTikTok = (
  setTikToks,
  userDetails,
  videoUrl,
  description,
  setDescription,
  setVideoUrl,
  setNewVideoShow
) => {
  const wallet = useWallet()
  const connection = new anchor.web3.Connection(SOLANA_HOST)
  const program = getProgramInstance(connection, wallet)

  const getTikToks = async () => {
    const videos = await program.account.videoAccount.all()

    setTikToks(videos)
  }
  // LikeVideo from smartContract
  const likeVideo = async address => {

  }

  const createComment = async (address, count, comment) => {

  }

  const newVideo = async () => {
    const randomKey = anchor.web3.Keypair.generate().publicKey

    let [video_pda] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('video'), randomKey.toBuffer()],
      program.programId
    )

    const tx = await program.rpc.createVideo(
      description,
      videoUrl,
      userDetails.userName,
      userDetails.userProfileImageUrl,
      {
        accounts: {
          video: video_pda,
          randomkey: randomKey,
          authority: wallet.publicKey,
          ...defaultAccounts
        }
      }
    )
    console.log(tx)
    setDescription('')
    setVideoUrl('')
    setNewVideoShow(false)
  }

  const getComments = async (address, count) => {

  }
  return { getTikToks, likeVideo, createComment, newVideo, getComments }
}

export default useTikTok