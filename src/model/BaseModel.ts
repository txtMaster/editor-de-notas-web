import type { WithID } from "../types/WithID"


export default abstract class BaseModel<T extends WithID>{
    abstract getBaseData():T
    abstract setBaseData(data:T):void
    static default(){
        throw new Error("sobreecribir")
    }
}