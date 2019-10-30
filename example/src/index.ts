import $ from 'vanilly';
import vanillaObserver from 'vanilla-observer';

const obser = vanillaObserver({
  list: Array(500).fill(0) as number[],
  name: 'hello',
});

const App = () => {
  return $('div').$append(
    ...obser.state.list.map((v, i) => {
      const item = $('div').$text('hello' + i);

      item.$on('click', () => {
        obser.update(s => {
          s.list[i] += 1;
        });
      });

      obser.connectElement(
        item,
        s => [s.list[i], s.list],
        (i, list) => {
          item.$text(i);
        },
      );

      return item;
    }),
  );
};

document.body.append(App());
