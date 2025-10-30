import type { EditableState } from "../types/EditableState"
import type { WithID } from "../types/WithID"


export default abstract class BaseModel<T extends WithID> implements WithID{
    abstract id:string
    abstract getBaseData():T
    abstract setBaseData(data:T):void
    static default(){
        throw new Error("sobreecribir")
    }
}
export abstract class SelectableModel<T extends WithID & EditableState> extends BaseModel<T>{
    selected :boolean = false
    editable :EditableState = "created_no_saved"
}