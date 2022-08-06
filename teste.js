// require('dotenv').config()

// const keys = {
//   access_key: process.env.CONSUMER_KEY,
//   secret: process.env.CONSUMER_SECRET,
//   token_key: process.env.ACCESS_TOKEN,
//   token_secret: process.env.TOKEN_SECRET,
// }

// const url = `https://api.twitter.com/2/users/${process.env.USER_ID}/retweets`
// keys.url = url
// keys.method = 'POST'

// const oauth = require('./services/oauth')
// const header = oauth.signatureHeader(keys)

// console.log(header)

const twitter = require('./apis/twitter')
const tweet = '1551413633481154560'  // invalid
// const tweet = '1551413597275914240' // valid
const test = async () => {
  const response = await twitter.retweet(tweet)
  console.log(response)
}

test()
