import React from 'react'
import styles from '../styles/UploadModal.module.css'

function UploadModal({
  description,
  videoUrl,
  newVideo,
  setDescription,
  setVideoUrl,
  setNewVideoShow
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Upload New Video</div>
      <div className={styles.inputField}>
        <div className={styles.inputTitle}>Description</div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            className={styles.input}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.inputField}>
        <div className={styles.inputTitle}>Video Url</div>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            value={videoUrl}
            onChange={e => setVideoUrl(e.target.value)}
            type="text"
          />
        </div>
        <div className={styles.modalButton}>
          <button
            onClick={() => setNewVideoShow(false)}
            className={`${styles.button} ${styles.cancel}`}
          >
            Cancel
          </button>
          <button
            onClick={newVideo}
            className={`${styles.button} ${styles.createButton}`}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default UploadModal