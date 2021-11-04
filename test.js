const expect = require('chai').expect
const request = require('request')
const sinon = require('sinon')
const app = require('./album')
const body = require('./testSample')

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
      expect(console.log.calledWith('ERROR: invalid argument, please enter integer between 1 and 100')).to.be.true
    })
    it('should error when albumId < 100', () => {
      app('101')
      expect(console.log.calledOnce).to.be.true
      expect(console.log.calledWith('ERROR: invalid argument, please enter integer between 1 and 100')).to.be.true
    })
    it('should error with albumId containing characters', () => {
      app('abc123')
      expect(console.log.calledOnce).to.be.true
      expect(console.log.calledWith('ERROR: invalid argument, please enter integer between 1 and 100')).to.be.true
    })
    it('should error with albumId containing floats', () => {
      app('1.2')
      expect(console.log.calledOnce).to.be.true
      expect(console.log.calledWith('ERROR: invalid argument, please enter integer between 1 and 100')).to.be.true
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
      sinon.spy(console, 'log')
      app('1')
      expect(
        console.log.firstCall.calledWith(
          '[ 1 ] accusamus beatae ad facilis cum similique qui sunt'
        )
      ).to.be.true
      done()
    })
    it('should have the arguments for the last log', done => {
      sinon.spy(console, 'log')
      app('1')
      expect(
        console.log.lastCall.calledWith(
          '[ 50 ] et inventore quae ut tempore eius voluptatum'
        )
      ).to.be.true
      done()
    })
  })
})