import $ from 'vanilly';
import vanillaObserver from 'vanilla-observer';

const obser = vanillaObserver({
  list: Array(2000).fill(0) as number[],
  name: 'hello',
});

(window as any).obser = obser;

const App = () => {
  return $('div').$append(
    ...obser.state.list.map((v, i) => {
      const item = $('div').$text('hello' + i);

      item.$on('click', () => {
        obser.update(s => {
          s.list[i] += 1;
        });
      });

      obser.listenElement(
        item,
        s => [s.list[i], s.list],
        (i, list) => {
          item.$text(i);
          if (i > 1) {
            item.remove();
          }
        },
      );

      return item;
    }),
  );
};

console.time('render');
document.body.append(App());
setTimeout(() => {
  console.timeEnd('render');
});
