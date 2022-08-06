const crypto = require('crypto')
const OAuth = require('oauth-1.0a')

exports.signatureHeader = ({ access_key, secret, token_key, token_secret, url, method }) => {
  try {
    const oauth = OAuth({
      consumer: {
        key: access_key,
        secret: secret
      },
      signature_method: 'HMAC-SHA1',
      hash_function: (baseString, key) => crypto.createHmac('SHA1', key).update(baseString).digest('base64')
    });

    const token = {
      key: token_key,
      secret: token_secret
    }

    const authHeader = oauth.toHeader(oauth.authorize({
      url: url,
      method: method
    }, token))

    return authHeader
  } catch (e) {
    console.log(e)
    process.exit(-1)
    //rollbar?
  }
}
