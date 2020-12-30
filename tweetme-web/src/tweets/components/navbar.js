import axios from 'axios';
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';


export default function Navbar(props) {
    const [logout, setLogout] = useState(false)
    let token = localStorage.getItem('token')
    console.log(token)
    var handleClick = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/auth/logout',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            },
            data: null,
        }).then((res) => {
            setLogout(true)
            localStorage.removeItem("token")
        }).catch((err) => {
            alert(err)
        })

    }
    if (logout == true) { return <Redirect to="/twitter" /> }
    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">MyTwitter</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0 d-none">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Dropdown
        </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <li class="nav-item">
                            <a
                                class="nav-link"
                                href="#"
                                tabindex="-1"
                                aria-disabled="true"
                            >Disabled</a
                            >
                        </li>
                    </ul>
                    <button class="nav-item btn btn-danger" style={{ "margin-left": "1300px" }} onClick={handleClick}>
                        logout
                    </button>
                </div>
            </div>
        </nav>

    )
}
