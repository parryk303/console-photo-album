const expect = require('chai').expect
const request = require('request')
const chalk = require('chalk')
const sinon = require('sinon')
const body = require('./testSample')
const boxen = require('boxen')
const app = require('./album')

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

describe('Photo Album', () => {
  describe('Photo Album with ERROR: invalid params', () => {
    beforeEach(() => {
      sinon.spy(console, 'log')
    })
    afterEach(() => {
      sinon.restore()
    })
    it('should error when albumId < 1', () => {
      app('0')
      expect(console.log.calledOnce).to.be.true
      expect(console.log.calledWith(errorMessage)).to.be.true
    })
    it('should error when albumId < 100', () => {
      app('101')
      expect(console.log.calledOnce).to.be.true
      expect(console.log.calledWith(errorMessage)).to.be.true
    })
    it('should error with albumId containing characters', () => {
      app('abc123')
      expect(console.log.calledOnce).to.be.true
      expect(console.log.calledWith(errorMessage)).to.be.true
    })
    it('should error with albumId containing floats', () => {
      app('1.2')
      expect(console.log.calledOnce).to.be.true
      expect(console.log.calledWith(errorMessage)).to.be.true
    })
  })

  describe('Photo Album with valid params', () => {
    beforeEach(() => {
      sinon.stub(request, 'get').yields(null, null, body)
    })
    afterEach(() => {
      sinon.restore()
    })
    it('should parse http request', done => {
      sinon.spy(JSON, 'parse')
      app('1')
      expect(JSON.parse.callCount).to.equal(1)
      done()
    })
    it('should console.log 50 photo ids and titles', done => {
      sinon.spy(console, 'log')
      app('1')
      expect(console.log.callCount).to.equal(50)
      done()
    })
    it('should have the arguments for the first log', done => {
      const id = chalk.cyan.bold('[1] ')
      const title = chalk.white.bold('accusamus beatae ad facilis cum similique qui sunt')
      const info = boxen(id + title, validOptions)
      sinon.spy(console, 'log')
      app('1')
      expect(
        console.log.firstCall.calledWith(info)
      ).to.be.true
      done()
    })
    it('should have the arguments for the last log', done => {
      const id = chalk.cyan.bold('[50] ')
      const title = chalk.white.bold('et inventore quae ut tempore eius voluptatum')
      const info = boxen(id + title, validOptions)
      sinon.spy(console, 'log')
      app('1')
      expect(
        console.log.lastCall.calledWith(info)
      ).to.be.true
      done()
    })
  })
})
