let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function destroyAll(req) {

  let addressPages = {}

  do {
    addressPages = await data.get({
      table: 'addresses',
      limit: 25
    })

    let addresses = []
    for await (let address of addressPages) {
      await data.destroy({
          key: address.key,
          table: 'addresses'
      })
    }
  } while (addressPages != null)

let partialAddressPages = {}
  do {
      partialAddressPages = await data.get({
        table: 'partialAddresses',
        limit: 25
      })

      let addresses = []
      for await (let address of partialAddressPages) {
        await data.destroy({
            key: address.key,
            table: 'partialAddresses'
        })
      }
    } while (partialAddressPages != null)
    
  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
