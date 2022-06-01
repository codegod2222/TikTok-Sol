import { useRef, useState } from 'react'
import styles from '../styles/Video.module.css'

const Video = ({
  address,
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
      {console.log(url)}
      {console.log('hi')}
      <video
        className={styles.videoPlayer}
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src={url}
        style={{ objectFit: 'cover' }}
      />
      <Footer
        channel={channel}
        description={description}
        song={index}
      />
      <SideBar
        address={address}
        likes={likes}
        shares={shares}
        onShowComments={showComments}
        likeVideo={likeVideo}
        index={index}
        likesAddress={likesAddress}
        messages={commentCount}
      />
      {showCommentsModal && (
        <Comment
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