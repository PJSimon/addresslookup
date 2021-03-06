let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function destroy(req) {
  console.log(req.body)

  let key = arc.http.helpers.bodyParser(req).key
  await data.destroy({
    key,
    table: 'addresses'
  })
  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
