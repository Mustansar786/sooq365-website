import React from 'react'
import Register from 'components/auth/Register';
import LoggedLayout from 'Layouts/LoggedLayout';

export default function Signup() {
    return (
        <LoggedLayout title="Sign Up">
            <form id="login_page">
                <Register />
            </form>
        </LoggedLayout>
    )
}
