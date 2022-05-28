import MainView from "../components/MainView"

let connected = false

export default function Home() {
  return (
    <div className='app'>
      {connected ? (
        <MainView />
      ) :
        (
          <div className="loginContainer">
            <div className="loginTitle">Log in to Tiktok</div>
            <div className="loginSubtitle"> Manage your account, check notifications, comment on videos, and more.</div>
          </div>
        )
      }
    </div>
  )
}
