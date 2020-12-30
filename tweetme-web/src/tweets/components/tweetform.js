import React, { useState } from 'react';
import TweetList from './tweetlist';
import axios from 'axios'
import Navbar from './navbar'

function createNewTweet(newTweet, callback) {
    axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/api/tweets/create/',
        data: {
            content: newTweet
        }
    }).then((res) => {
        console.log(res.data)
        callback(res.data, res.status)

    }).catch((err) => {
        console.log(err)
    })

}

export default function TweetForm(props) {
    var { data } = props;
    var [content, setContent] = useState("")
    const [newTweets, setNewTweets] = useState([])
    var handleChange = (e) => { setContent(e.target.value) }

    var handleSubmit = (event) => {
        event.preventDefault()
        const newVal = content;
        let newTweetsTemp = [...newTweets]
        createNewTweet(newVal, (response, status) => {
            if (status == 201) {
                console.log("here")
                newTweetsTemp.unshift(response)
                setNewTweets(newTweetsTemp)
            } else {
                console.log(response)
                alert("ERROR WHILE POSTING")
            }
        })
        setContent("")
    }
    const canTweet = data.canTweet === "false" ? false : true
    console.log(data)
    return (
        <div>
            <Navbar />
            <div class="row mb-6">
                {canTweet == true && <div class="col-md-4 mx-auto col-10">
                    <form
                        class="form mb-6"
                        method="POST"
                        action="/create-tweet"
                        id="tweet-create-form"
                        onSubmit={handleSubmit}
                    >
                        <div class="d-none alert alert-danger" id="tweet-create-form-error"></div>
                        <textarea
                            required="required"
                            class="form-control"
                            name="content"
                            placeholder="What's on your mind?"
                            value={content}
                            onChange={handleChange}

                        ></textarea>
                        <button class="btn btn-primary mb-6" type="submit">Tweet</button>
                    </form>
                </div>}
                <TweetList newTweets={newTweets} data={data} />
            </div>
        </div>
    )
}