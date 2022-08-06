const path = require('path');
const dirPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: dirPath })

const axios = require('axios')
const dayjs = require('dayjs')
const oauth = require('../services/oauth')

const keys = {
  access_key: process.env.CONSUMER_KEY,
  secret: process.env.CONSUMER_SECRET,
  token_key: process.env.ACCESS_TOKEN,
  token_secret: process.env.TOKEN_SECRET,
}

exports.searchTweets = async () => {
  const bearerToken = process.env.BEARER_TOKEN
  const query = process.env.TWEET_SEARCH_QUERY
  const url = 'https://api.twitter.com/2/tweets/search/recent'

  const options = {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    },
    params: {
      query: query,
      start_time: dayjs().subtract(process.env.SEARCH_INTERVAL, 'hour').$d,
      max_results: 10
    }
  }

  const response = await axios.get(url, options)

  //response.data pattern:
  // {
  //   data: [
  //     { id: '1551413633481154560', text: 'teste 2 #vagastechjr' },
  //     { id: '1551413597275914240', text: 'teste 1 #vagasdevjr' }
  //   ],
  //   meta: {
  //     newest_id: '1551413633481154560',
  //     oldest_id: '1551413597275914240',
  //     result_count: 2
  //   }
  // }

  return response.data
}

exports.retweet = async (tweetId) => {
  const url = `https://api.twitter.com/2/users/${process.env.USER_ID}/retweets`
  keys.url = url
  keys.method = 'POST'

  const authHeader = oauth.signatureHeader(keys).Authorization

  const data = { 'tweet_id': tweetId }

  const options = {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/json'
    }
  }

  const response = await axios.post(url, data, options)

  return response
}
