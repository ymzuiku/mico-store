class Subject<T> {
  key = 1;
  eventList = {} as any;
  next = (state?: T) => {
    Object.keys(this.eventList).forEach(k=>{
      const fn= this.eventList[k];
      fn && fn(state);
    })
  };
  subscribe = (fn: (state: T) => any) => {
    this.key++;
    
    const nowKey = this.key;
    this.eventList[nowKey] = fn;
    return {
      unsubscribe: () => {
        delete this.eventList[nowKey];
      },
    };
  };
}

interface IStore<T> extends Subject<T> {
  state: T;
  nextState: (fn: (state: T) => any) => any;
  subscribeNode: (ele: Node, fn: (state: T) => any) => any;
  subscribeFilter: <M extends any[]>(
    filter: (state: T) => M,
    fn: (...theMemo: M) => any
  ) => any;
  subscribeFilterNode: <M extends any[]>(
    ele: HTMLElement,
    filter: (state: T) => M,
    fn: (...theMemo: M) => any
  ) => any;
}

function vanillaObserver<T>(state: T): IStore<T> {
  const store: IStore<T> = new Subject() as any;
  store.state = state;

  store.nextState = (fn: (state: T) => any) => {
    fn(state);
    store.next(state);
  };

  store.subscribeNode = (ele, fn) => {
    const sub = store.subscribe(state => {
      if (!document.contains(ele)) {
        sub.unsubscribe();
        return;
      }
      fn(state);
    });
  };

  store.subscribeFilter = (filter, fn) => {
    let last = filter(state);
    const len = last.length;
    return store.subscribe(state => {
      const current = filter(state);
      let isJump = false;
      for (let i = 0; i < len; i++) {
        if (current[i] !== last[i]) {
          isJump = true;
          break;
        }
      }
      if (isJump) {
        return;
      }
      fn(...current);
      last = current;
    });
  };

  store.subscribeFilterNode = (ele, filter: any, fn) => {
    const sub = store.subscribeFilter(filter, (...props: any) => {
      if (!document.contains(ele)) {
        sub.unsubscribe();
        return;
      }
      fn(...props);
    });
  };

  return store;
}

export default vanillaObserver;
