const twitter = require('../apis/twitter')
const discord = require('../apis/discord')

exports.queryRetweetAll = async () => {
  const tweetsData = await twitter.searchTweets()
  const maxTweets = tweetsData.meta.result_count
  const failedTweets = []
  const tweets = tweetsData.data
  let retweetedTweets = maxTweets

  if (maxTweets > 0) {
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
  }

  const message = `${retweetedTweets} out of ${maxTweets} tweets were successfully retweeted \n`
  if (failedTweets.length > 0) message += `Failed retweets tweet IDs: \n ${failedTweets}`

  console.log(message)
  discord.sendMessage(message)
}
