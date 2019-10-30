declare function vanillaObserver<T>(state: T, isDelay?: boolean): {
    state: T;
    events: Set<any>;
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: <M extends [] | [any] | [any, any] | [any, any, any] | [any, any, any, any] | [any, any, any, any, any] | [any, any, any, any, any, any] | [any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any]>(memo: (state: T) => M, fn: (...nowMemo: M) => any) => () => void;
    unListen: (fn: any) => void;
    /** You can replace this Function, example add immer in this */
    beforeUpdate: (fn: any) => void;
    connectElement: <M extends [] | [any] | [any, any] | [any, any, any] | [any, any, any, any] | [any, any, any, any, any] | [any, any, any, any, any, any] | [any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any]>(element: Element, memo: (state: T) => M, fn: (...nowMemo: M) => any, autoRun?: boolean) => void;
    update: (fn?: ((state: T) => any) | undefined) => void;
};
export default vanillaObserver;
