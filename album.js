const request = require('request')

const album = () => {
  request.get(
    'https://jsonplaceholder.typicode.com/photos?albumId=' + process.argv[2],
    (err, res, body) => JSON.parse(body).forEach(photo => console.log(`[ ${photo.id} ] ${photo.title}`))
  )
}

module.exports = album