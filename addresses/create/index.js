let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function create(req) {
  console.log(req.body)

  let address = arc.http.helpers.bodyParser(req)
  address.created = Date.now()
  let record = await data.set({
    table: 'addresses',
    ...address
  })

  console.log(record)

//  for (var i = 1; i < address.line1.length; i++) {
//    let partialAddress = {}
//    partialAddress.line1 = address.line1.substring(0,i)
//    partialAddress.addressFK = record.key
//    await data.set({
//      table: 'partialAddresses',
//      ...partialAddress
//    })
//  }
//
//  for (var i = 1; i < address.line2.length; i++) {
//    let partialAddress = {}
//    partialAddress.line2 = address.line2.substring(0,i)
//    partialAddress.addressFK = record.key
//    await data.set({
//      table: 'partialAddresses',
//      ...partialAddress
//    })
//  }
//
//  for (var i = 1; i < address.city.length; i++) {
//    let partialAddress = {}
//    partialAddress.city = address.city.substring(0,i)
//    partialAddress.addressFK = record.key
//    await data.set({
//      table: 'partialAddresses',
//      ...partialAddress
//    })
//  }

  for (var i = 1; i < address.zip.length; i++) {
    let partialAddress = {}
    partialAddress.zip = address.zip.substring(0,i)
    partialAddress.addressFK = record.key
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
    body: JSON.stringify(record)
  }
}
