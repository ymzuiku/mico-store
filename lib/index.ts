export type IListen<T> = <
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
    | [
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
      ]
>(
  memo: (state: T) => M,
  fn: (...nowMemo: M) => any,
  autoRun?: boolean
) => any;

export type IListenElement<T> = <
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
    | [
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
      ]
>(
  element: Element,
  memo: (state: T) => M,
  fn: (...nowMemo: M) => any,
  autoRun?: boolean
) => any;

export interface IObserver<T> {
  // listenElementRecheckNumber
  __lern: number;
  // listenElementRecheckNumber length
  __lern_length: number;
  state: T;
  events: Set<any>;
  listen: IListen<T>;
  listenElement: IListenElement<T>;
  unListen: (fn: any) => any;
  beforeUpdate: (fn: any) => any;
  update: (fn?: (state: T) => any) => any;
}

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

export function timeoutInterval(space: number, timeout: number, fn: Function) {
  let time = 0;
  let timer = setInterval(() => {
    time += 30;
    if (time > timeout && timer !== null) {
      clearInterval(timer);
      timer = null as any;
      return;
    }
    fn();
  }, space);

  return timer;
}

/**
 * Slowy, use setInterval, spaceTime is 30ms, timeout is 3500ms
 * @param ele 
 * @param fn 
 * @param space 
 * @param timeout 
 */
export function waitElementRendered(
  ele: HTMLElement,
  space = 30,
  timeout = 3500
) {
  return new Promise((res, rej)=>{
    let timer = timeoutInterval(space, timeout, () => {
      const isHave = document.body.contains(ele);
      if (isHave && timer !== null) {
        res();
        clearInterval(timer);
        timer = null as any;
      } else {
        rej()
      }
    });
  })
}

/**
 * Slowy, use setInterval, spaceTime is 350ms, timeout is 900000ms
 * @param ele 
 * @param fn 
 * @param space 
 * @param timeout 
 */
export function waitElementRemoved(
  ele: HTMLElement,
  space = 350,
  timeout = 900000
) {
  return new Promise((res, rej)=>{
    let timer = timeoutInterval(space, timeout, () => {
      const isHave = document.body.contains(ele);
      if (!isHave && timer !== null) {
        res();
        clearInterval(timer);
        timer = null as any;
      } else {
        rej()
      }
    });
  })
}

function vanillaObserver<T>(state: T, isDelay = true) {
  const isBrower = document && document.createElement;
  const observer: IObserver<T> = {
    __lern: 0,
    __lern_length: 20,
    state,
    events: new Set<any>(),
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: (memo, fn) => {
      (fn as any).getMemo = memo;
      (fn as any).lastMemo = memo(observer.state);

      if (!observer.events.has(fn)) {
        observer.events.add(fn);
      }

      return () => {
        observer.unListen(fn);
      };
    },
    listenElement: (element, memo, fn, autoRun = true) => {
      if (!isBrower) {
        return;
      }

      const listenFn = (...nowMemo: any) => {
        const isHave = document.body.contains(listenFn.element);

        if (isHave) {
          fn(...nowMemo);
        } else {
          unListenEle();
        }
      };
      listenFn.element = element;

      const unListenEle = observer.listen(memo, listenFn);

      if (autoRun) {
        fn(...memo(observer.state));
      }
    },
    unListen: (fn: any) => {
      fn.element = null;
      fn.getMemo = null;
      fn.lastMemo = null;
      observer.events.delete(fn);
    },
    beforeUpdate: (fn: any) => {
      if (fn) {
        fn(observer.state);
      }
    },
    update: (fn?: (state: T) => any) => {
      observer.beforeUpdate(fn);
      timeOutRun(isDelay, () => {
        observer.__lern += 1;
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

          // 定时检查没有被清空的元素捆绑
          if (fn.element && observer.__lern > observer.__lern_length) {
            observer.__lern = 0;
            const isHave = document.body.contains(fn.element);
            if (!isHave) {
              observer.unListen(fn);
            }
          }
        });
      });
    }
  };

  return observer;
}

export default vanillaObserver;
