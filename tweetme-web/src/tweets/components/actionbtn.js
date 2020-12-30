import React, { useState } from 'react';
import axios from 'axios'

export default function ActionBtn(props) {
    const { tweet, action, acitonPerformed } = props;
    const [userLike, setUserLike] = useState(false)
    const likes = tweet.likes ? tweet.likes : 0;

    //const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0)

    function apiActionBtn(tweetId, action, callback) {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/tweets/action/',
            data: {
                id: tweetId,
                action: action,
            }
        }).then((res) => {
            console.log(res.data)
            callback(res.data, res.status)

        }).catch((err) => {
            console.log(err)
        })

    }
    const handleClick = (e) => {
        e.preventDefault();
        apiActionBtn(tweet.id, action.type, (response, status) => {
            //if ((status == 200 || status == 201) && acitonPerformed) {
            console.log(response, status)
            acitonPerformed(response, status)
            // setLikes(response.likes)
            //   }
        })
    }
    const display = action.type === 'like' ? `${likes} ${action.display}` : action.display

    return (
        <div>
            <button className='btn btn-primary btn-sm' onClick={handleClick}>{display}</button>
        </div>
    )
}