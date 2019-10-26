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
import micoStore from 'vanilla-observer';

const store = micoStore({
  name: 'dog',
  age: 5,
});

const unListen = store.listen(state => {
  console.log(state); // {name:'cat', age: 5}
});

store.setState({
  name: 'cat',
});
```
