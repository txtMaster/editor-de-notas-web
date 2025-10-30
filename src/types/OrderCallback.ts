export type OrderCallback<T> = (a:T,b:T)=>number
export type OrderCallbackObject<T> = {[K in keyof T]?: OrderCallback<T>};