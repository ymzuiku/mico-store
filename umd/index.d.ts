declare class Subject<T> {
    key: number;
    eventList: any;
    next: (state?: T | undefined) => void;
    subscribe: (fn: (state: T) => any) => {
        unsubscribe: () => void;
    };
}
interface IStore<T> extends Subject<T> {
    state: T;
    nextState: (fn: (state: T) => any) => any;
    subscribeNode: (ele: Node, fn: (state: T) => any) => any;
    subscribeFilter: <M extends any[]>(filter: (state: T) => M, fn: (...theMemo: M) => any) => any;
    subscribeFilterNode: <M extends any[]>(ele: HTMLElement, filter: (state: T) => M, fn: (...theMemo: M) => any) => any;
}
declare function vanillaObserver<T>(state: T): IStore<T>;
export default vanillaObserver;
