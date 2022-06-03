import { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { SOLANA_HOST } from '../utils/const';
import { getProgramInstance } from '../utils/utils';
import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import useAccount from '../hooks/useAccount'
import styles from '../styles/MainView.module.css'
import SignUp from '../components/SignUp'
import useTikTok from '../hooks/useTikTok';
import Video from './Video';
import UploadModal from './UploadModal';
import BottomBar from './BottomBar';

const anchor = require('@project-serum/anchor')
const utf8 = anchor.utils.bytes.utf8
const { BN, web3 } = anchor
const { SystemProgram } = web3

const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId
}

const MainView = () => {
    const [isAccount, setIsAccount] = useState(false)
    const wallet = useWallet()
    const connection = new anchor.web3.Connection(SOLANA_HOST)

    const program = getProgramInstance(connection, wallet)
    const [tiktoks, setTikToks] = useState([])
    const [newVideoShow, setNewVideoShow] = useState(false)
    const [description, setDescription] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [userDetail, setUserDetail] = useState()

    const { signup } = useAccount()
    const { getTikToks, likeVideo, createComment, newVideo, getComments } = useTikTok(
        setTikToks,
        userDetail,
        videoUrl,
        description,
        setDescription,
        setVideoUrl,
        setNewVideoShow
    )

    const checkAccount = async () => {
        let [user_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode('user'), wallet.publicKey.toBuffer()],
            program.programId,
        )
        try {
            const userInfo = await program.account.userAccount.fetch(user_pda)
            setUserDetail(userInfo)
            setIsAccount(true)
        } catch (e) {
            setIsAccount(false)
        }
    }

    useEffect(() => {
        if (wallet.connected) {
            checkAccount()
            getTikToks()

        }
    }, [wallet.connected])

    return (
        <>
            {isAccount ? (
                <div>
                    {newVideoShow && (
                        <UploadModal
                            description={description}
                            newVideo={newVideo}
                            newVideoShow={newVideoShow}
                            setDescription={setDescription}
                            setNewVideoShow={setNewVideoShow}
                            setVideoUrl={setVideoUrl}
                        />
                    )}
                    <div className={styles.appVideos}>
                        {tiktoks.length === 0 ? (
                            // <h1>No Videos</h1>
                            <Video
                            />
                        ) : (
                            tiktoks.map((tiktok, id) => {
                                console.log(tiktok.account.videoUrl)
                                return <Video
                                    key={id}
                                    url={tiktok.account.videoUrl}
                                    channel={tiktok.account.creatorName}
                                    index={tiktok.account.index.toNumber()}
                                    likes={tiktok.account.likes}
                                    description={tiktok.account.description}
                                    shares={tiktok.account.remove.toNumber()}
                                    likeVideo={likeVideo}
                                    likesAddress={tiktok.account.peopleWhoLiked}
                                    createComment={createComment}
                                    getComments={getComments}
                                    commentCount={tiktok.account.commentCount.toNumber()}
                                />
                            })
                        )}
                    </div>
                    <BottomBar
                        setNewVideoShow={setNewVideoShow}
                        getTikToks={getTikToks}
                    />
                </div>
            ) : (
                <SignUp signup={signup} wallet={wallet.publicKey.toBase58()} />
            )}
        </>
    )
}

export default MainView