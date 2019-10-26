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

const unListen = obs.listen(state => {
  console.log(state); // {name:'cat', age: 5}
});

obs.setState({
  name: 'cat',
});
```
