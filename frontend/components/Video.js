import { useRef, useState } from 'react'
import styles from '../styles/Video.module.css'

const Video = ({
  key,
  address,
  url,
  channel,
  index,
  likes,
  description,
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
    <div className={styles.wrapper}>
      <video
        className={styles.videoPlayer}
        loop
        onClick={onVideoPress}
        ref={videoRef}
        src={url}
        style={{ objectFit: 'cover' }}
      />
      {/* Footer */}

      {/* SideBar */}

      {showCommentsModal && (
        <Comment />
      )}
    </div>
  )
}

export default Video;