import axios from 'axios'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'

export default class Signup extends Component {
    state = {
        name: '',
        password: '',
        email: '',
        token: ''
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = e => {
        e.preventDefault();
        const { name, password, email } = this.state;
        const item = { "username": name, "password": password, "email": email };
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/auth/register',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: name,
                email: email,
                password: password,
            },
        }).then((res) => {
            console.log(res.data)
            this.setState({ "token": res.data.token })
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("username", res.data.user.username)
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Username Already Exists",
            })
        })

    }
    render() {
        if (this.state.token) return <Redirect to='/' />
        const { name, password, email } = this.state;
        return (
            <div className='container' style={{ "padding-top": "130px", "textAlign": "center" }}>
                <h1 style={{ "color": "white" }}>Sign Up</h1>
                <form onSubmit={this.onSubmit} method='post'>
                    <div className='form-group'>
                        <label for="name" style={{ "color": "white" }}>name:</label>
                        <input type="text" name="name" className='form-control' onChange={this.onChange} value={name} />
                        <br />
                    </div>
                    <div className='form-group'>
                        <label for="password" style={{ "color": "white" }}>password:</label>
                        <input type="password" name="password" className='form-control' onChange={this.onChange} value={password} />
                        <br />
                    </div>
                    <div className='form-group'>
                        <label for="email" style={{ "color": "white" }}>email:</label>
                        <input type="email" name="email" className='form-control' onChange={this.onChange} value={email} />
                        <br />
                    </div>
                    <button type='submit' className=' btn btn-primary'>
                        Submit
                    </button>
                </form>
            </div >
        )
    }
}
