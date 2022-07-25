const cron = require('node-cron')
const dayjs = require('dayjs')

const twitter = require('./apis/twitter')

// cron.schedule('1 * * * * *', async () => {
//   console.log(`Running now at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);
// });



const test = async () => console.log(await twitter.searchTweets())

// test()
