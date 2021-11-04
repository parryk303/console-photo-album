const request = require('request')
const chalk = require('chalk')
const boxen = require('boxen')
const arg = process.argv[2]

const invalidOptions = {
  padding: 1,
  margin: 0,
  borderStyle: 'double',
  borderColor: 'red',
}

const validOptions = {
  padding: 1,
  margin: 0,
  borderStyle: 'double',
  borderColor: 'green',
}

const error = chalk.red.bold('ERROR: ')
const message = chalk.white.bold('invalid argument, please enter integer between 1 and 100')
const errorMessage = boxen(error + message, invalidOptions)

const isValidArg = (arg) => {
  if (arg > 0 && arg < 100 && !/\D/.test(arg)) {
    return true
  }
  return false
}

const album = (albumId) => {
  isValidArg(albumId) ?
    request.get('https://jsonplaceholder.typicode.com/photos?albumId=' + arg, (err, res, body) => {
        JSON.parse(body).forEach(photo => {
          const id = chalk.cyan.bold(`[${photo.id}] `)
          const title = chalk.white.bold(`${photo.title}`)
          const info = boxen(id + title, validOptions)
          console.log(info)
      })})
    :
    console.log(errorMessage)
}

album(arg)

module.exports = album