const { Duplex } = require('streamx')

class DuplexPair extends Duplex {
  constructor (opts) {
    super(opts)

    this.other = null
    this._oncontinue = null
  }

  _predestroy () {
    this._continue(new Error('Destroyed'))
    this.other.destroy(new Error('Pair was destroyed'))
  }

  _read (cb) {
    this.other._continue(null)
    cb(null)
  }

  _continue (err) {
    const cb = this._oncontinue
    this._oncontinue = null
    if (cb !== null) cb(err)
  }

  _write (data, cb) {
    if (this.other.push(data) === false) {
      this._oncontinue = cb
    } else {
      cb(null)
    }
  }

  _final (data, cb) {
    this.other.push(null)
    cb(null)
  }
}

module.exports = function duplexThrough (opts) {
  const a = new DuplexPair(opts)
  const b = new DuplexPair(opts)

  a.other = b
  b.other = a

  return [a, b]
}
