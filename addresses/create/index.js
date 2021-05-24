let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function create(req) {
  console.log(req.body)

  let address = arc.http.helpers.bodyParser(req)
  address.created = Date.now()
  await data.set({
    table: 'addresses',
    ...address
  })

  for (var i = 2; i < address.zip.length - 1; i++) {
    let partialAddress.zip = address.zip.substring(0,i)
    await data.set({
      table: 'partialAddresses',
      ...partialAddress
    })
  }

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
    body: JSON.stringify(address)
  }
}
