export declare type IListen<T> = <M extends [] | [any] | [any, any] | [any, any, any] | [any, any, any, any] | [any, any, any, any, any] | [any, any, any, any, any, any] | [any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any]>(memo: (state: T) => M, fn: (...nowMemo: M) => any, autoRun?: boolean) => any;
export declare type IListenElement<T> = <M extends [] | [any] | [any, any] | [any, any, any] | [any, any, any, any] | [any, any, any, any, any] | [any, any, any, any, any, any] | [any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any] | [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any]>(element: Element, memo: (state: T) => M, fn: (...nowMemo: M) => any, autoRun?: boolean) => any;
export interface IObserver<T> {
    __lern: number;
    __lern_length: number;
    state: T;
    events: Set<any>;
    listen: IListen<T>;
    listenElement: IListenElement<T>;
    unListen: (fn: any) => any;
    beforeUpdate: (fn: any) => any;
    update: (fn?: (state: T) => any) => any;
}
declare function vanillaObserver<T>(state: T, isDelay?: boolean): IObserver<T>;
export default vanillaObserver;
