function vanillaObserver<T>(state: T) {
  const observer = {
    state,
    events: new Set<any>(),
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: <M>(fn: (state: T, nowMemo: M) => any, memo?: (state: T) => M) => {
      if (memo) {
        (fn as any).getMemo = memo;
        (fn as any).lastMemo = memo(observer.state);
      }

      if (!observer.events.has(fn)) {
        observer.events.add(fn);
      }

      return () => {
        observer.events.delete(fn);
      };
    },
    unListen: (fn: any) => {
      observer.events.delete(fn);
    },
    setState: (payload: any) => {
      observer.state = {
        ...observer.state,
        ...payload,
      };

      observer.update();
    },
    /** You can replace this Function, example add immer in this */
    beforeUpdate: (fn: any) => {
      if (fn) {
        fn(observer.state);
      }
    },
    connectElement: <M>(
      element: Element,
      fn: (state: T, nowMemo: M) => any,
      memo?: (state: T) => M,
      autoRun = true,
    ) => {
      if (!document || !document.createElement) {
        return;
      }

      const unListenEle = observer.listen((state, nowMemo) => {
        const isHave = document.body.contains(element);

        if (isHave) {
          fn(state, nowMemo);
        } else {
          unListenEle();
        }
      }, memo);

      if (autoRun) {
        fn(observer.state, (memo ? memo(observer.state) : []) as any);
      }
    },
    update: (fn?: (state: T) => any) => {
      observer.beforeUpdate(fn);
      observer.events.forEach(fn => {
        if (fn.getMemo && fn.lastMemo) {
          const nowMemo = fn.getMemo(observer.state);
          let isNeedUpdate = false;
          for (let i = 0; i < fn.lastMemo.length; i++) {
            const v = fn.lastMemo[i];
            if (v !== nowMemo[i]) {
              isNeedUpdate = true;
              break;
            }
          }
          if (isNeedUpdate) {
            fn(observer.state, fn.lastMemo);
          }
        } else {
          fn(observer.state, fn.lastMemo);
        }
      });
    },
  };

  return observer;
}

export default vanillaObserver;
