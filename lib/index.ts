class Subject<T> {
  eventList = {} as any;
  next = (state?: T) => {
    Object.keys(this.eventList).forEach((k) => {
      const fn = this.eventList[k];
      fn && fn(state);
    });
  };
  subscribe = (fn: (state: T) => any) => {
    const nowKey = Date.now() + Math.random();
    this.eventList[nowKey] = fn;
    return {
      unsubscribe: () => {
        delete this.eventList[nowKey];
      },
    };
  };
}

interface IStore<T, A> extends Subject<T> {
  actions: A;
  state: T;
  nextState: (fn?: (state: T) => any) => any;
  subscribeTarget: (
    ele: Node,
    fn: (state: T) => any,
    dispose?: (state: T) => any
  ) => any;
  subscribeFilter: (filter: (state: T) => any[], fn: (state: T) => any) => any;
  subscribeFilterTarget: (
    ele: Node,
    filter: (state: T) => any[],
    fn: (state: T) => any,
    dispose?: (state: T) => any
  ) => any;
}

function vanillaObserver<T, A>(state: T, actions?: A): IStore<T, A> {
  const store: IStore<T, A> = new Subject() as any;
  store.state = state;
  store.actions = actions || ({} as any);

  store.nextState = (fn?: (state: T) => any) => {
    fn && fn(state);
    store.next(state);
  };

  store.subscribeTarget = (ele, fn, dispose) => {
    const sub = store.subscribe((state) => {
      if (!document.contains(ele)) {
        sub.unsubscribe();
        dispose && dispose(state);
        return;
      }
      fn(state);
    });
  };

  store.subscribeFilter = (filter, fn) => {
    let last = filter(state);
    const len = last.length;
    return store.subscribe((theState) => {
      const current = filter(theState);
      let isKeep = true;
      for (let i = 0; i < len; i++) {
        if (current[i] !== last[i]) {
          isKeep = false;
          break;
        }
      }
      if (isKeep) {
        return;
      }
      fn(theState);
      last = current;
    });
  };

  store.subscribeFilterTarget = (ele, filter: any, fn, dispose) => {
    const sub = store.subscribeFilter(filter, (theState) => {
      if (!document.contains(ele)) {
        sub.unsubscribe();
        dispose && dispose(theState);
        return;
      }
      fn(theState);
    });
  };

  return store;
}

export default vanillaObserver;
