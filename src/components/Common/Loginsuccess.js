import React from 'react'
import { useSelector } from 'react-redux'

const LoginSuccess = () => {
    const { user, userRole } = useSelector((state) => state.auth)
    console.log(userRole)

    return (
        <div>
            <h1>{user ? userRole : 'user not found'}</h1>
        </div>
    )
}

export default LoginSuccess
