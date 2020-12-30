import React, { useEffect, useState } from 'react';
import { Tweet } from '../index'
import axios from 'axios'
import Swal from 'sweetalert2'

function loadTweets(callback, username) {
    console.log(username)
    const xhr = new XMLHttpRequest();
    const method = 'GET';
    var endpoint = 'http://127.0.0.1:8000/api/tweets/'
    if (username) {
        endpoint = `http://127.0.0.1:8000/api/tweets/?username=${username}`
    }
    const url = endpoint;
    const responseType = 'json';

    xhr.responseType = responseType;
    xhr.open(method, url);

    xhr.onload = function () {
        callback(xhr.response, xhr.status)
    };
    xhr.onerror = () => {
        callback({ "message": "there's an error in catching" }, 400)
    }
    xhr.send(username);
}

export default function TweetList(props) {
    var username = localStorage.getItem("username")
    console.log(username)
    const [tweetsInit, setTweetsInit] = useState([]);
    const [tweets, setTweets] = useState([])
    const [tweetDidMount, setTweetDidMount] = useState(false)
    //console.log(props.newTweets)
    useEffect(() => {
        const final = props.newTweets.concat(tweetsInit)
        console.log(final)
        if (final.length !== tweets.length) { //just to breakthe loop
            setTweets(final)
        }
    }, [tweets, props.newTweets, tweetsInit])
    useEffect(() => {
        if (tweetDidMount == false) {
            const callback = (response, status) => {
                //console.log(response)
                if (status === 200) {
                    setTweetsInit(response);
                    setTweetDidMount(true)
                } else {
                    alert("theres an error")
                }
            }
            loadTweets(callback, props.data.username)
        }
    }, [tweetDidMount, tweetsInit, props.data.username])

    const handleRetweet = (newTweet) => {
        const updatedInit = [...tweetsInit]
        updatedInit.unshift(newTweet)
        setTweetsInit(updatedInit)
        const finalTweets = [...tweets]
        finalTweets.unshift(newTweet)
        setTweets(finalTweets)
    }

    const handleClick = (e) => {
        let id = e.target.id
        axios({
            method: 'delete',
            url: `http://127.0.0.1:8000/api/tweets/${id}/delete/`,
        }).then((res) => {
            console.log(res.data)
            setTweetDidMount(false)
            Swal.fire({
                icon: 'success',
                text: 'Tweet has been removed!',
            })

        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                text: 'you cannot delete this!',
            })
        })

    }
    return (
        <div className="mt-6">{tweets.map((tweet, index) => {
            return (
                <div ><Tweet hideActions={false} tweet={tweet} didRetweet={handleRetweet} key={`${index}-'tweet.id'`} />
                    <button className='btn btn-outline-danger btn-sm' id={tweet.id} onClick={handleClick}>Delete</button>
                </div>)
        })}</div>
    )
}