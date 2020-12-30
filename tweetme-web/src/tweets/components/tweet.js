
import React, { useState } from 'react';
import ActionBtn from './actionbtn'

export default function Tweet(props) {
  const { tweet, didRetweet, hideActions } = props;
  const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)

  const handleActionPerformed = (newActionTweet, status) => {
    if (status == 200) {
      //like or unlike 
      setActionTweet(newActionTweet)

    } else if (status == 201) {
      //retweet 
      if (didRetweet) {
        didRetweet(newActionTweet)
      }

    }
  }
  const handleLink = (event) => {
    event.preventDefault()
    window.location.href = `/${tweet.id}`
  }
  return (
    <div className="mb-4 col-12 col-md-10 mx-auto border-top py-4">
      <li>{tweet.id}-{tweet.content}</li>
      { tweet.parent && <div className="col-11 mx-auto border rounded">
        <p className='mb-0 small'>Retweet</p>< Tweet hideActions className="mx-auto p-3 border roumded" tweet={tweet.parent} /></div>}
      < div className='btn-group'>
        {(actionTweet && hideActions !== true) && <React.Fragment>
          <ActionBtn tweet={actionTweet} acitonPerformed={handleActionPerformed} action={{ type: "like", display: "likes" }} />
          <ActionBtn tweet={actionTweet} acitonPerformed={handleActionPerformed} action={{ type: "unlike", display: "unlike" }} />
          <ActionBtn tweet={actionTweet} acitonPerformed={handleActionPerformed} action={{ type: "retweet", display: "retweet" }} />
        </React.Fragment>}
        <button className='btn btn-outline-primary btn-sm' onClick={handleLink}>View</button>
      </div>
    </div >
  )
}


