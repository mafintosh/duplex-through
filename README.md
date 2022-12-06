# duplex-pair

Make two Duplex streamx streams that are paired.

Write to one, it push data to the other one.

```
npm install duplex-pair
```

Useful for testing server/client flows

## Usage

``` js
const duplexPair = require('duplex-pair')

const [a, b] = duplexPair()

a.write('hello')
b.on('data', function (data) {
  // hello
})
```

## License

MIT
