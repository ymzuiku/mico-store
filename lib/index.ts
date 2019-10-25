function micoStore<T>(state: T) {
  const store = {
    state,
    events: new Set<any>(),
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: <M>(fn: (state: T, nowMemo: M) => any, memo?: (state: T) => M) => {
      if (memo) {
        (fn as any).getMemo = memo;
        (fn as any).lastMemo = memo(store.state);
      }

      if (!store.events.has(fn)) {
        store.events.add(fn);
      }

      return () => {
        store.events.delete(fn);
      };
    },
    unListen: (fn: any) => {
      store.events.delete(fn);
    },
    setState: (payload: any) => {
      store.state = {
        ...store.state,
        ...payload,
      };

      store.update();
    },
    /** You can replace this Function, example add immer in this */
    beforeUpdate: (fn: any) => {
      if (fn) {
        fn(store.state);
      }
    },
    connectElement: <M>(element: Element, fn: (state: T, nowMemo: M) => any, memo?: (state: T) => M) => {
      if (!document || !document.createElement) {
        return;
      }
      if (!element.id) {
        element.id =
          Date.now().toString(32) +
          Math.random()
            .toString(32)
            .slice(2);
      }

      const id = element.id;
      (element as any).__micoStoreId = id;

      const unListenEle = store.listen((state, nowMemo) => {
        const el = document.getElementById(id);
        if (el) {
          (el as any).__micoStoreEvent(state, nowMemo);
        } else {
          unListenEle();
        }
      }, memo);
    },
    update: (fn?: (state: T) => any) => {
      store.beforeUpdate(fn);
      store.events.forEach(fn => {
        if (fn.getMemo && fn.lastMemo) {
          const nowMemo = fn.getMemo(store.state);
          let isNeedUpdate = false;
          for (let i = 0; i < fn.lastMemo.length; i++) {
            const v = fn.lastMemo[i];
            if (v !== nowMemo[i]) {
              isNeedUpdate = true;
              break;
            }
          }
          if (isNeedUpdate) {
            fn(store.state, fn.lastMemo);
          }
        } else {
          fn(store.state, fn.lastMemo);
        }
      });
    },
  };

  return store;
}

export default micoStore;
