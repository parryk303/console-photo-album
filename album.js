const request = require('request')

const album = (albumId) => {
    albumId > 0 && albumId < 100 ?
      request.get(
        'https://jsonplaceholder.typicode.com/photos?albumId=' + process.argv[2],
        (err, res, body) => JSON.parse(body).forEach(photo => console.log(`[ ${photo.id} ] ${photo.title}`))
      )
      :
      console.log('invalid argument, please enter number between 1 and 100')
}

module.exports = album