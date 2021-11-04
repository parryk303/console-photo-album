const request = require('request')
const arg = process.argv[2]

const isValidArg = (arg) => {
  if (arg > 0 && arg < 100 && !/\D/.test(arg)) {
    return true
  }
  return false
}

const album = (albumId) => {
  isValidArg(albumId) ?
    request.get(
      'https://jsonplaceholder.typicode.com/photos?albumId=' + arg,
      (err, res, body) =>
      JSON.parse(body).forEach(photo =>
        console.log(`[ ${photo.id} ] ${photo.title}`)))
    :
    console.log('ERROR: invalid argument, please enter integer between 1 and 100')
}

album(arg)

module.exports = album