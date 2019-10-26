declare function micoStore<T>(state: T): {
    state: T;
    events: Set<any>;
    /** listen Fn in update, memo is Filter listen whith diff state  */
    listen: <M>(fn: (state: T, nowMemo: M) => any, memo?: ((state: T) => M) | undefined) => () => void;
    unListen: (fn: any) => void;
    setState: (payload: any) => void;
    /** You can replace this Function, example add immer in this */
    beforeUpdate: (fn: any) => void;
    connectElement: <M>(element: Element, fn: (state: T, nowMemo: M) => any, memo?: ((state: T) => M) | undefined, autoRun?: boolean) => void;
    update: (fn?: ((state: T) => any) | undefined) => void;
};
export default micoStore;
