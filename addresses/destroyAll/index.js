let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function destroyAll(req) {

  let addressPages = {}

  do {
    console.log("Get Addresses")
    addressPages = await data.get({
      table: 'addresses',
      limit: 25
    })

console.log(addressPages)
    let addresses = []
    for await (let address of addressPages) {
    console.log(address.key)
      await data.destroy({
          key: address.key,
          table: 'addresses'
      })
    }
  } while (addressPages.length > 0)

let partialAddressPages = {}
  do {
  console.log("Get Partial Addresses")
      partialAddressPages = await data.get({
        table: 'partialAddresses',
        limit: 25
      })

      let addresses = []
      for await (let address of partialAddressPages) {
        console.log(address.key)
        await data.destroy({
            key: address.key,
            table: 'partialAddresses'
        })
      }
    } while (partialAddressPages.length > 0)

  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
