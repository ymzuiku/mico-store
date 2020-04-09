# vanilla-observer

| type   | size |
| ------ | ---- |
| min.js | 1kb  |
| gzip   | 300b |

## Install

unpkg, use last version:

```html
<script src="https://unpkg.com/vanilla-observer@2.0.0/umd/index.js"></script>
```

npm:

```sh
$ npm install --save vanilla-observer
```

## Use reactive at base HTMLElement:

```js
import vanillaObserver from 'vanilla-observer';

const obser = vanillaObserver({
  name: 'dog',
  age: 5,
});

// listen and connect Element
const element = document.getElementById('theElement');

// If obser's name is update, change the element
// If Element remove int document, auto unListe function
obser.subscribeFilterNode(element, s => [s.name], name => element.textContent = name);

// change obser's name
const input = document.getElementById('theInput');
input.oninput = (event)=>{
  obser.nextState(s=>{
    s.name = event.target.value;
  })
};
```


## Use Observer at everywhere:

```js
import vanillaObserver from 'vanilla-observer';

const obser = vanillaObserver({
  name: 'dog',
  age: 5,
});

// Only listen s.name on change
const sub = obser.subscribeFilter(
  s => [s.name],
  (s) => {
    console.log(s.name); // 'cat'
  },
);

obser.update(s => {
  s.name = 'cat';
});

// after destory
sub.unsubscribe();
```

