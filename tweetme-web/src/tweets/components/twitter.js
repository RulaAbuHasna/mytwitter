import React from 'react';
import { Redirect } from 'react-router-dom';

export default function MainPage() {
    var handleLogin = () => {
        return window.location.href = "/twitter/login"
    }
    var hangleRegister = () => {
        return window.location.href = "/twitter/register"

    }
    return (
        <div className="container" style={{ "padding-top": "250px", "textAlign": "center" }}>
            <h1>
                Welcome To MyTwitter
            </h1>
            <button className="btn btn-primary btn-bg" onClick={handleLogin} >Log In</button>
            <button className="btn btn-light" onClick={hangleRegister} >Sign Up</button>

        </div>
    )
}