# duplex-through

Make two Duplex streamx streams that are passing through to each other.

Write to one, it push data to the other one.

```
npm install duplex-through
```

Useful for testing server/client flows

## Usage

``` js
const duplexThrough = require('duplex-through')

const [a, b] = duplexThrough()

a.write('hello')
b.on('data', function (data) {
  // hello
})
```

## License

MIT
