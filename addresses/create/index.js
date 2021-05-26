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
//
//  for (var i = 1; i < address.line1.length; i++) {
//    let partialAddress = {}
//    partialAddress.addressFK = record.key
//    await data.set({
//      table: 'partialAddresses',
//      key: address.line1.substring(0,i),
//      ...partialAddress
//    })
//  }
//
//  for (var i = 1; i < address.line2.length; i++) {
//    let partialAddress = {}
//    partialAddress.addressFK = record.key
//    await data.set({
//      table: 'partialAddresses',
//      key: address.line2.substring(0,i),
//      ...partialAddress
//    })
//  }
//
//  for (var i = 1; i < address.city.length; i++) {
//    let partialAddress = {}
//    partialAddress.addressFK = record.key
//    await data.set({
//      table: 'partialAddresses',
//      key: address.city.substring(0,i),
//      ...partialAddress
//    })
//  }

  for (var i = 2; i <= address.zip.length; i++) {
    let key = address.zip.substring(0,i)
    let partialAddress = {}

    //check if partialAddress already exists
    partialAddress = await data.get({
      table: 'partialAddresses',
      key: key,
      limit: 5
    })

    //If it exists, add the FK to the array, else create the record with a single-element array
    if (partialAddress != null) {
      if (partialAddress.addressFK.includes(record.key) == false) {
        partialAddress.addressFK = partialAddress.addressFK.substring(0, partialAddress.addressFK.length - 1) + ", " + record.key + "]}"
      }
    }
    else {
      partialAddress = {
        addressFK: "{[" + record.key + "]}"
      }
    }

    //Create of update the record
    await data.set({
      table: 'partialAddresses',
      key: key,
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
