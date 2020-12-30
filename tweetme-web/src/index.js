import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { TweetDetail } from './tweets/index'
import reportWebVitals from './reportWebVitals';

const tweetEl = document.getElementById('root');
console.log(tweetEl.dataset)


ReactDOM.render(
  <React.StrictMode>
    <App data={tweetEl.dataset} />
  </React.StrictMode>,
  document.getElementById('root')
);

const tweetDetailElements = document.querySelectorAll(".tweetme-2-detail")

tweetDetailElements.forEach(container => {
  ReactDOM.render(
    React.createElement(TweetDetail, container.dataset),
    container);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
