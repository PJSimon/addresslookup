let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function execute(req) {
  console.log(req.body)
  
  let query = arc.http.helpers.bodyParser(req)

  let pages = await data.get({
    table: 'partialAddresses',
    limit: 25
  })

  let addresses = []
  for await (let address of pages) {
    addresses.push(address)
  }

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify(addresses)
  }
}
