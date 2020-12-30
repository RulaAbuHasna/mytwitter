import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import Swal from 'sweetalert2'


export default class Login extends Component {
    state = {
        name: '',
        password: '',
        token: ''
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = e => {
        e.preventDefault();
        const { name, password } = this.state;
        console.log(name, password)
        //   const item = { "username": name, "password": password };
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/auth/login',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                username: name,
                password: password,
            },
        }).then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token)
            this.setState({ token: localStorage.getItem('token') })
            localStorage.setItem('username', res.data.user.username)
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'error in username or password!',
            })
        })
    }
    render() {
        console.log(this.state.token)
        if (this.state.token) return <Redirect to='/' />
        const { name, password } = this.state;
        return (
            <div className='container' style={{ "padding-top": "150px", "textAlign": "center" }}>
                <h1 style={{ "color": "white" }}>LogIn</h1>
                <form onSubmit={this.onSubmit} method='post'>
                    <div className='form-group'>
                        <label for="name" style={{ "color": "white" }}>name:</label>
                        <input type="text" name="name" className='form-control' onChange={this.onChange} value={name} placeholder="username:" />
                        <br />
                    </div>
                    <div className='form-group'>
                        <label style={{ "color": "white" }} for="password">password:</label>
                        <input type="password" name="password" className='form-control' onChange={this.onChange} value={password} placeholder="password:" />
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

