let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function execute(req) {
  let body = arc.http.helpers.bodyParser(req)
  let query = body.query
  console.log(query)
  
//  let line1 = await data.get({
//    table: 'partialAddresses',
//    key: query,
//    limit: 5
//  })
//
//  let line2 = await data.get({
//    table: 'partialAddresses',
//    key: query,
//    limit: 5
//  })
//
//  let city = await data.get({
//    table: 'partialAddresses',
//    key: query,
//    limit: 5
//  })
//
//  let state = await data.get({
//    table: 'partialAddresses',
//    key: query,
//    limit: 5
//  })

  let zip = await data.get({
    table: 'partialAddresses',
    key: query,
    limit: 5
  })

//  let line1_addresses = await data.get({
//    table: 'addresses',
//    line1: query,
//    limit: 5
//  })
//
//  let line2_addresses = await data.get({
//    table: 'addresses',
//    line2: query,
//    limit: 5
//  })
//
//  let city_addresses = await data.get({
//    table: 'addresses',
//    city: query,
//    limit: 5
//  })
//
//  let state_addresses = await data.get({
//    table: 'addresses',
//    state: query,
//    limit: 5
//  })

  let zip_addresses = await data.get({
    table: 'addresses',
    key: query,
    limit: 5
  })

//  console.log('line1' + JSON.stringify(line1))
//  console.log('line2' + JSON.stringify(line2))
//  console.log('city' + JSON.stringify(city))
//  console.log('state' + JSON.stringify(state))
  console.log('zip' + JSON.stringify(zip))

//  console.log('line1_addresses' + JSON.stringify(line1_addresses))
//  console.log('line2_addresses' + JSON.stringify(line2_addresses)
//  console.log('city_addresses' + JSON.stringify(city_addresses))
//  console.log('state_addresses' + JSON.stringify(state_addresses))
  console.log('zip_addresses' + JSON.stringify(zip_addresses))


  // Get all unique address keys
  console.log('Get all unique address keys')
  let addressKeys = []
//  for await (let partialAddress of line1) {
//    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
//      addressKeys.push(partialAddress.addressFK)
//    }
//  }
//  for await (let partialAddress of line2) {
//    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
//      addressKeys.push(partialAddress.addressFK)
//    }
//  }
//  for await (let partialAddress of city) {
//    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
//      addressKeys.push(partialAddress.addressFK)
//    }
//  }
//  for await (let partialAddress of state) {
//    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
//      addressKeys.push(partialAddress.addressFK)
//    }
//  }
  for (let partialAddress of zip) {
    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
      addressKeys.push(partialAddress.addressFK)
    }
  }

//  for await (let address of line1_addresses) {
//    if ( addressKeys.indexOf(address.key) == -1 ) {
//      addressKeys.push(address.key)
//    }
//  }
//  for await (let address of line2_addresses) {
//    if ( addressKeys.indexOf(address.key) == -1 ) {
//      addressKeys.push(address.key)
//    }
//  }
//  for await (let address of city_addresses) {
//    if ( addressKeys.indexOf(address.key) == -1 ) {
//      addressKeys.push(address.key)
//    }
//  }
//  for await (let address of state_addresses) {
//    if ( addressKeys.indexOf(address.key) == -1 ) {
//      addressKeys.push(address.key)
//    }
//  }
  for await (let address of zip_addresses) {
    if ( addressKeys.indexOf(address.key) == -1 ) {
      addressKeys.push(address.key)
    }
  }

  // Create query object to resolve address keys
  console.log('Create query object to resolve address keys')
  let queryObjects = []
  for await (let addressKey of addressKeys) {
    let queryObject = {}
    queryObject.table = 'addresses'
    queryObject.key = addressKey
    queryObjects.push(queryObject)
  }


  // Output Results
  console.log('Output Results')
  console.log(JSON.stringify(queryObjects))
  let pages = await data.get(queryObjects)

  let addresses = []
  for await (let address of pages) {
    addresses.push(address)
  }

//  addresses.sort((a, b) => a.zip - b.zip)

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify(addresses)
  }
}
