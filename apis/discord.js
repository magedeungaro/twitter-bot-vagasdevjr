const path = require('path');
const dirPath = path.join(__dirname, '../.env');
require('dotenv').config({ path: dirPath })

const axios = require('axios')

exports.sendMessage = async (message) => {
  const url = process.env.DISCORD_WEBHOOK

  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const data = {
    'content': message
  }

  const response = await axios.post(url, data, options)

  if (!response.status == 204) console.error('Message could not be sent', { status: response.status })
}
