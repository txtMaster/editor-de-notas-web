import type { Note } from "../types/Note";
import type { Selectable } from "../types/Selectable";
import BaseModel from "./BaseModel";

export default class NoteModel extends BaseModel<Note> implements Note{
    static override default():Note{
        return {
            id:"",
            title:"",
            content:""
        };
    }

    id:string
    title:string
    content:string

    constructor({id,content,title}:Note = NoteModel.default()){
        super()
        this.id = id
        this.content = content
        this.title = title
    }
    getBaseData():Note{
        return {
        id:this.id,
        title: this.title,
        content:this.content
    }};
    setBaseData({id,title,content}: Note): void {
        this.id = id
        this.title = title
        this.content = content
    }
    
}
export class SelectableNote extends NoteModel implements Selectable{
    public selected : boolean = false
}
