# vanilla-observer

| type   | size |
| ------ | ---- |
| min.js | 1kb  |
| gzip   | 300b |

## Install

```sh
$ npm install --save vanilla-observer
```

## Use

```js
import vanillaObserver from 'vanilla-observer';

const obs = vanillaObserver({
  name: 'dog',
  age: 5,
});

// listen s.name on change
const unListen = obs.listen(
  s => [s.name],
  name => {
    console.log(name); // 'cat'
  },
);

obs.update(s => {
  s.name = 'cat';
});
```
