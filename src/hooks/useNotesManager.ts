import { SelectableNote } from "../model/NoteModels";
import type { Note } from "../types/Note";
import { useListManager } from "./useListManager";


export function useNotesManager(){
	return useListManager<Note,SelectableNote>(
	SelectableNote,
	{
		id:(a:Note,b:Note)=>parseFloat(a.id) - parseFloat(b.id),
		title:(a:Note,b:Note)=>a.title.localeCompare(b.title),
		content:(a:Note,b:Note)=>a.content.localeCompare(b.content),
	}
)
}