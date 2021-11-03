const expect = require('chai').expect
const request = require('request')
const sinon = require('sinon')
const app = require('./album')
const body = require('./testSample')

describe('Photo Album', () => {
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