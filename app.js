require('dotenv').config()
const cron = require('node-cron')
const dayjs = require('dayjs')

const retweetBusiness = require('./business/queryRetweetAll')

cron.schedule(process.env.CRON_INTERVAL, async () => {
  console.log(`Running now at ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`);

  retweetBusiness.queryRetweetAll()
});
