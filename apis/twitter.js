require('dotenv').config()
const axios = require('axios')
const dayjs = require('dayjs')

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
      start_time: dayjs().subtract(process.env.CRON_INTERVAL, 'hour').$d,
      max_results: 10
    }
  }

  const response = await axios.get(url, options)

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
