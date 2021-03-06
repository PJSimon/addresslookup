let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function update(req) {
  console.log(req.body)

  let address = arc.http.helpers.bodyParser(req)
  await data.set({
    table: 'addresses',
    ...address
  })
  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify(address)
  }
}
