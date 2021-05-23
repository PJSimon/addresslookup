let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function create(req) {
  let address = arc.http.helpers.bodyParser(req)
  address.created = Date.now()
  await data.set({
    table: 'addresses',
    ...address
  })

  await data.set({
    table: 'partialAddresses',
    ...address
  })

  return {
    // statusCode: 302,
    // headers: {
    //   location: '/',
    //   'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    // }
    statusCode: 201,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify(addresses)
  }
}
