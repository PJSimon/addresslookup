let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function execute(req) {
  let body = arc.http.helpers.bodyParser(req)
  let query = body.query
  console.log(query)
  
  let line1 = await data.get({
    table: 'partialAddresses',
    line1: query,
    limit: 5
  })

  let line2 = await data.get({
    table: 'partialAddresses',
    line2: query,
    limit: 5
  })

  let city = await data.get({
    table: 'partialAddresses',
    city: query,
    limit: 5
  })

  let state = await data.get({
    table: 'partialAddresses',
    state: query,
    limit: 5
  })

  let zip = await data.get({
    table: 'partialAddresses',
    zip: query,
    limit: 5
  })

  // Get all unique address keys
  console.log('Get all unique address keys')
  let addressKeys = []
  for await (let partialAddress of line1) {
    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
      addressKeys.push(partialAddress.addressFK)
    }
  }
  for await (let partialAddress of line2) {
    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
      addressKeys.push(partialAddress.addressFK)
    }
  }
  for await (let partialAddress of city) {
    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
      addressKeys.push(partialAddress.addressFK)
    }
  }
  for await (let partialAddress of state) {
    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
      addressKeys.push(partialAddress.addressFK)
    }
  }
  for await (let partialAddress of zip) {
    if ( addressKeys.indexOf(partialAddress.addressFK) == -1 ) {
      addressKeys.push(partialAddress.addressFK)
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
