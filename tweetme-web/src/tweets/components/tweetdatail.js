import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tweet } from '../index'

var tweetDetail = (tweetId, callback) => {
    axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/tweets/${tweetId}/`,
    }).then((res) => {
        console.log(res.data)
        callback(res.data, res.status)

    }).catch((err) => {
        console.log(err)
    })
}

export default function TweetDetail(props) {
    const { tweetId } = props;
    const [didLookUp, setDidLookUp] = useState(false)
    const [tweet, setTweet] = useState(null)
    useEffect(() => {
        if (didLookUp == false) {
            setDidLookUp(true)
            tweetDetail(tweetId, (response, status) => {
                if (status == 200) {
                    setTweet(response)
                } else {
                    alert("error finding the tweet")
                }
            })
        }
    }, [didLookUp, tweetId])
    return tweet !== null ? <Tweet tweet={tweet} /> : null;
}
