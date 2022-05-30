import React from 'react'
import SignUp from '../components/SignUp'

let isAccount = false;
const MainView = () => {
    return (
        <>
            {isAccount ? (
                <div>
                    {/* TikToks will go here */}
                </div>
            ) : (
                <SignUp />
            )}
        </>
    )
}

export default MainView