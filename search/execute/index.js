let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function execute(req) {
  let body = arc.http.helpers.bodyParser(req)
  let query = body.query
  console.log(query)

  let lookupItem = await data.get({
    table: 'lookups',
    key: query,
    limit: 25
  })

  console.log('lookupItem' + JSON.stringify(lookupItem))

  // Get all matching address keys
  console.log('Get all unique address keys')
  let addressKeys = []
  if (lookupItem != null) {
    for (let addressKey of lookupItem.addressFK) {
        addressKeys.push(addressKey)
    }

    // Create query object to resolve address keys
    console.log('Create query object to resolve address keys')
    console.log(addressKeys)
    let queryObjects = []
    for (let addressKey of addressKeys) {
      let queryObject = {}
      queryObject.table = 'addresses'
      queryObject.key = addressKey
      queryObjects.push(queryObject)
    }

    // Output Address Results
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
  else {
    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json; charset=utf8',
        'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
      },
      body: ''
    }
  }
}
