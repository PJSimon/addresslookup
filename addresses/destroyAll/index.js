let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function destroyAll(req) {
  // Delete all address records
  let addressPages = {}
  do {
    addressPages = await data.get({
      table: 'addresses',
      limit: 25
    })

    let addresses = []
    for await (let address of addressPages) {
    console.log(address.key)
      await data.destroy({
          key: address.key,
          table: 'addresses'
      })
    }
  } while (addressPages.length > 0)

  // Delete all lookup records
  let lookupPages = {}
  do {
      lookupPages = await data.get({
        table: 'lookups',
        limit: 25
      })

      let addresses = []
      for await (let address of lookupPages) {
        console.log(address.key)
        await data.destroy({
            key: address.key,
            table: 'lookups'
        })
      }
    } while (lookupPages.length > 0)

  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
