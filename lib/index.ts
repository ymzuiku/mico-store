const timeOutRun = (isDelay: boolean, fn: any) => {
  if (!isDelay) {
    fn();
  } else {
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(fn);
    } else {
      setTimeout(() => {
        fn();
      }, 30);
    }
  }
};

function vanillaObserver<T>(state: T, isDelay = true) {
  const observer = {
    state,
    events: new Set<any>(),
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: <
      M extends
        | []
        | [any]
        | [any, any]
        | [any, any, any]
        | [any, any, any, any]
        | [any, any, any, any, any]
        | [any, any, any, any, any, any]
        | [any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any]
    >(
      memo: (state: T) => M,
      fn: (...nowMemo: M) => any,
    ) => {
      (fn as any).getMemo = memo;
      (fn as any).lastMemo = memo(observer.state);

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
    // setState: (payload: any) => {
    //   observer.state = {
    //     ...observer.state,
    //     ...payload,
    //   };

    //   observer.update();
    // },
    /** You can replace this Function, example add immer in this */
    beforeUpdate: (fn: any) => {
      if (fn) {
        fn(observer.state);
      }
    },
    connectElement: <
      M extends
        | []
        | [any]
        | [any, any]
        | [any, any, any]
        | [any, any, any, any]
        | [any, any, any, any, any]
        | [any, any, any, any, any, any]
        | [any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any, any, any]
        | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any]
    >(
      element: Element,
      memo: (state: T) => M,
      fn: (...nowMemo: M) => any,
      autoRun = true,
    ) => {
      if (!document || !document.createElement) {
        return;
      }

      const unListenEle = observer.listen(memo, (...nowMemo: M) => {
        const isHave = document.body.contains(element);

        if (isHave) {
          fn(...nowMemo);
        } else {
          unListenEle();
        }
      });

      if (autoRun) {
        fn(...memo(observer.state));
      }
    },

    update: (fn?: (state: T) => any) => {
      observer.beforeUpdate(fn);
      timeOutRun(isDelay, () => {
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
            fn.lastMemo = nowMemo;
            if (isNeedUpdate) {
              fn(...fn.lastMemo);
            }
          } else {
            fn(...fn.lastMemo);
          }
        });
      });
    },
  };

  if (!document || !document.createElement) {
    observer.connectElement = null as any;
  }

  return observer;
}

export default vanillaObserver;
