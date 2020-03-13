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
export declare function timeoutInterval(space: number, timeout: number, fn: Function): number;
/**
 * Slowy, use setInterval, spaceTime is 30ms, timeout is 3500ms
 * @param ele
 * @param fn
 * @param space
 * @param timeout
 */
export declare function waitElementRendered(ele: HTMLElement, space?: number, timeout?: number): Promise<unknown>;
/**
 * Slowy, use setInterval, spaceTime is 350ms, timeout is 900000ms
 * @param ele
 * @param fn
 * @param space
 * @param timeout
 */
export declare function waitElementRemoved(ele: HTMLElement, space?: number, timeout?: number): Promise<unknown>;
declare function vanillaObserver<T>(state: T, isDelay?: boolean): IObserver<T>;
export default vanillaObserver;
