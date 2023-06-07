import Login from 'components/auth/Login'
import LoggedLayout from 'Layouts/LoggedLayout'
import React from 'react'

export default function Signin() {
    return (
        <LoggedLayout title="Sign In">
            <div id="login_page">
                <Login />
            </div>
        </LoggedLayout>
    )
}
