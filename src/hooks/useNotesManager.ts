import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectableNote } from "../model/NoteModels";
import type { Note } from "../types/Note";

export function useNoteManager(
	defaultNotes: Map<string, SelectableNote> = new Map()
) {
	//Map con todas las notas donde el key es el id de la nota
	const [notes, setNotes] = useState<Map<string, SelectableNote>>(defaultNotes);
	//Set con los ids de las notas seleccionadas
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	//Callback para ordenar las notas
	const [orderCallback, setOrderCallback] = useState<
		(a: Note, b: Note) => number
	>(() => (a: Note, b: Note) => parseFloat(a.id) - parseFloat(b.id));

	//notas ordenadas
	const orderedNotes = useMemo(
		() => [...notes.values()].sort(orderCallback),
		[notes, orderCallback]
	);

	//id de la ultima nota seleccionada
	const currentId = [...selectedIds].at(-1) ?? null;

	//nota seleccionada para editar
	const [editedNote, setEditedNote] = useState<Note | null>(null);

	//editar los attrs "selected" de las notas cuando se editan las ids selecionadas
	useEffect(() => {
		setNotes((prev) => {
			const updated = new Map(prev);
			for (const [id, note] of prev) {
				const isSelected = selectedIds.has(id);
				if (note.selected !== isSelected) {
					const next = new SelectableNote(note.getBaseData());
					next.selected = isSelected;
					updated.set(id, next);
				}
			}
			return updated;
		});
	}, [selectedIds]);

	//se actualiza la nota editada, asignandole la nota del ultimo id seleccionado
	useEffect(() => {
		setEditedNote(notes.get(currentId ?? "") ?? null);
	}, [currentId, notes, selectedIds]);

	const createNote = useCallback(
		(note: Note) => {
			let id: string;
			do id = Math.floor(Math.random() * 100).toString();
			while (notes.has(id));

			const newNote = new SelectableNote({ ...note, id });
			setNotes((pre) => new Map(pre).set(id, newNote));
			setSelectedIds(new Set([id]));
		},
		[notes]
	);

	//callback para cuando guardar una nota
	const saveNote = useCallback((note: Note | null = null) => {
		if (!note) return;
		setNotes((prev) => {
			const updated = new Map(prev);
			const existing = prev.get(note.id);
			let updatedNote: SelectableNote;
			if (existing) {
				updatedNote = existing;
				updatedNote.setBaseData(note);
			} else {
				updatedNote = new SelectableNote({ ...note });
			}
			setSelectedIds(new Set([note.id]));
			updated.set(updatedNote.id, updatedNote);
			return updated;
		});
	}, []);

	//callback para borrar todas las notas seleccionadas
	const deleteNotes = useCallback(() => {
		setNotes((prev) => {
			const next = new Map(prev);
			selectedIds.forEach((id) => next.delete(id));
			return next;
		});
		setSelectedIds(new Set());
	}, [selectedIds]);

    return {
		/**Map con todas las notas existentes */
        notes,
		/**Array con las notas ordenadas */
        orderedNotes,
		/**Set con las ids de las notas selecionadas */
        selectedIds,
        setSelectedIds,
		/**nota seleccionada para editar */
        editedNote,
		/**id de la ultima nota seleccionada */
		currentId,
        setEditedNote,
        createNote,
        saveNote,
        deleteNotes,
        orderCallback,
        setOrderCallback,
    }
}
