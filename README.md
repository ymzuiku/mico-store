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

const obser = vanillaObserver({
  name: 'dog',
  age: 5,
});

// listen s.name on change
const unListen = obser.listen(
  s => [s.name],
  name => {
    console.log(name); // 'cat'
  },
);

obser.update(s => {
  s.name = 'cat';
});

// listen and connect Element, if Element remove int document, auto unListe function
const element = document.getElementById('theElement');
obser.listenElement(element, s => [s.name], name => console.log(name));
```
