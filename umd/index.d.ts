declare class Subject<T> {
    eventList: any;
    next: (state?: T | undefined) => void;
    subscribe: (fn: (state: T) => any) => {
        unsubscribe: () => void;
    };
}
interface IStore<T, A> extends Subject<T> {
    actions: A;
    state: T;
    nextState: (fn?: (state: T) => any) => any;
    subscribeTarget: (ele: Node, fn: (state: T) => any, dispose?: (state: T) => any) => any;
    subscribeFilter: (filter: (state: T) => any[], fn: (state: T) => any) => any;
    subscribeFilterTarget: (ele: Node, filter: (state: T) => any[], fn: (state: T) => any, dispose?: (state: T) => any) => any;
}
declare function vanillaObserver<T, A>(state: T, actions?: A): IStore<T, A>;
export default vanillaObserver;
