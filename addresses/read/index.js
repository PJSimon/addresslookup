const data = require('@begin/data')

exports.handler = async function read(req) {
  let pages = await data.get({
    table: 'addresses',
    limit: 25
  })

  let addresses = []
  for await (let address of pages) {
    addresses.push(address)
  }

  addresses.sort((a, b) => a.zip - b.zip)

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify(addresses)
  }
}
