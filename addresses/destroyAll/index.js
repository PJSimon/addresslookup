let arc = require('@architect/functions')
let data = require('@begin/data')

exports.handler = async function destroyAll(req) {

  let pages = {}

  do {
    pages = await data.get({
      table: 'addresses',
      limit: 25
    })

    let addresses = []
    for await (let address of pages) {
      await data.destroy({
          key: address.key,
          table: 'addresses'
      })
    }
  } while (pages != null)

  do {
      pages = await data.get({
        table: 'partialAddresses',
        limit: 25
      })

      let addresses = []
      for await (let address of pages) {
        await data.destroy({
            key: address.key,
            table: 'partialAddresses'
        })
      }
    } while (pages != null)



  let key = arc.http.helpers.bodyParser(req).key
  await data.destroy({
    key,
    table: 'addresses'
  })
  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json; charset=utf8',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0'
    }
  }
}
