import { useState } from 'react'
import styles from '../styles/SignUp.module.css'

const SignUp = ({ signUp }) => {
  const [username, setUserName] = useState()
  const [profile, setProfile] = useState()

  const signUpClick = () => {
    signUp(username, profile)
  }

  return (
    <div className={styles.authContainer}>
      <h1 className={styles.title}>Sign up to use TikTok</h1>
      <div className={styles.signupForm}>
        <div className={styles.inputField}>
          <div className={styles.inputTitle}>Username:</div>
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              type='text'
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={styles.inputField}>
            <div className={styles.inputTitle}>Profile Image:</div>
            <div className={styles.inputContainer}>
              <input
                className={styles.input}
                type="text"
                onChange={(e) => setProfile(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div onClick={signUpClick} className={styles.loginButton}>Sign Up</div>
    </div >
  )
}

export default SignUp