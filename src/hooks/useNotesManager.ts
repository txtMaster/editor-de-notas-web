import { createDefaultNote, type Note } from "../types/Note";
import type { OrderCallbackObject } from "../types/OrderCallback";
import { useListManager } from "./useListManager";

export function useNotesManager() {
	const orderFunctions: OrderCallbackObject<Note> = {
		title: (a: Note, b: Note) => a.title.localeCompare(b.title),
		created_at: (a: Note, b: Note) => {
			return (
				new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
			);
		},
	}
	return {
		...useListManager<Note>(createDefaultNote(), orderFunctions),
		orderFuctions: orderFunctions
	};
}
