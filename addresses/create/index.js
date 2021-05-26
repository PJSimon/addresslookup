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

  await createLookupRecord(address.line1, record.key)
  await createLookupRecord(address.line2, record.key)
  await createLookupRecord(address.city, record.key)
  await createLookupRecord(address.state, record.key)
  await createLookupRecord(address.zip, record.key)

  return {
    statusCode: 201,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    },
    body: JSON.stringify(record)
  }
}

async function createLookupRecord(addressField, FK) {
  for (var i = 2; i <= addressField.length; i++) {
    let key = addressField.substring(0,i)
    let partialAddress = {}

    //check if partialAddress already exists
    partialAddress = await data.get({
      table: 'lookups',
      key: key,
      limit: 5
    })

    //If it exists, add the FK to the array, else create the record with a single-element array
    if (partialAddress != null) {
      if (partialAddress.addressFK.includes(FK) == false) {
          partialAddress.addressFK.push(FK)
      }
    }
    else {
      let FKs = []
      FKs.push(FK)
      partialAddress = {
        addressFK: FKs
      }
    }

    //Create or update the record
    await data.set({
      table: 'lookups',
      key: key,
      ...partialAddress
    })
  }
}
