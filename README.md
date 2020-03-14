# vanilla-observer

| type   | size |
| ------ | ---- |
| min.js | 1kb  |
| gzip   | 300b |

## Install

unpkg, use last version:

```html
<script src="https://unpkg.com/vanilla-observer@1.0.0/umd/index.js"></script>
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
obser.listenElement(element, s => [s.name], name => element.textContent = name);

// change obser's name
const input = document.getElementById('theInput');
input.oninput = (event)=>{
  obser.update(s=>{
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

// after destory
unListen();
```

## Other feature

### Wait element rendered

```js
import {waitElementRendered} from 'vanilla-observer';

const ele = docuement.createElement('div');
waitElementRendered(ele, ()=>{
  ele.textContent = 'hello, reset text';
});

```

### Wait element removed


```js
import { waitElementRemoved } from 'vanilla-observer';

const ele = docuement.createElement('div');
waitElementRendered(ele, ()=>{
  ele.textContent = 'hello, reset text';
});

```

