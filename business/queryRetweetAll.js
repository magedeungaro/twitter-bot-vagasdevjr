const twitter = require('../apis/twitter')

const queryRetweetAll = async () => {
  const tweetsData = await twitter.searchTweets()
  const maxTweets = tweetsData.meta.result_count

  if (maxTweets == 0) return

  const failedTweets = []
  let retweetedTweets = maxTweets
  const tweets = tweetsData.data

  for (let tweet in tweets) {
    tweet = tweets[tweet]
    try {
      await twitter.retweet(tweet.id)
    } catch (e) {
      console.log(e)
      failedTweets.push(tweet.id)
      retweetedTweets--
    }
  }

  console.log(`${retweetedTweets} out of ${maxTweets} tweets were successfully retweeted`)
  console.log(`Failed retweets tweet IDs: \n ${failedTweets}`)


}

queryRetweetAll()
