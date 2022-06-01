import { useRef, useState } from 'react'
import styles from '../styles/Video.module.css'
import Sidebar from './Sidebar'
import Footer from './Footer'
import Comments from './Comments'
const Video = ({
  key,
  url,
  channel,
  index,
  likes,
  description,
  shares,
  likeVideo,
  likesAddress,
  createComment,
  getComments,
  commentCount
}) => {

  const [playing, setPlaying] = useState(false)
  const [showCommentsModal, setShowCommentsModal] = useState(false)
  const videoRef = useRef(null)

  const onVideoPress = () => {
    if (playing) {
      videoRef.current.pause()
      setPlaying(false)
    } else {
      videoRef.current.play()
      setPlaying(true)
    }
  }

  const hideComments = () => {
    setShowCommentsModal(false)
  }

  const showComments = () => {
    setShowCommentsModal(true)
  }

  return (
    // TODO:- Video iFrame Bug, hardcoded the URL.
    <div className={styles.wrapper}>
      <video
        className={styles.videoPlayer}
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src={'https://v16m-webapp.tiktokcdn-us.com/968bccaa06208f8540f0c60aab2bff10/6298411f/video/tos/useast5/tos-useast5-pve-0068-tx/fc3d314f3c7b4858b8ad9a3a638ff659/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C1%7C0&cv=1&br=2294&bt=1147&cs=0&ds=3&ft=ebtHKH-qMyq8ZT6cvwe2NlF~fl7Gb&mime_type=video_mp4&qs=0&rc=aWhnOmhkNTVnOWk3ZWY0M0BpM250ZzQ6ZnM5ZDMzZzczNEAyYWBgMDQ2XzQxM14yYy4vYSNxNmBncjRfMF9gLS1kMS9zcw%3D%3D&l=2022060122472401000200300200500600300303C214B0'}
        style={{ objectFit: 'cover' }}
      />
      <Footer
        channel={channel}
        description={description}
        song={index}
      />
      {/* <SideBar
        address={address}
        likes={likes}
        shares={shares}
        onShowComments={showComments}
        likeVideo={likeVideo}
        index={index}
        likesAddress={likesAddress}
        messages={commentCount}
      /> */}
      {showCommentsModal && (
        <Comments
          onHide={hideComments}
          index={index}
          address={address}
          createComment={createComment}
          getComments={getComments}
          commentCount={commentCount}
        />
      )}
    </div>
  )
}

export default Video;