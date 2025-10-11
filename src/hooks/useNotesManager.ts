import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectableNote } from "../model/NoteModels";
import type { Note } from "../types/Note";

export function useNoteManager(
	defaultNotes: Map<string, SelectableNote> = new Map()
) {
	const [notes, setNotes] = useState<Map<string, SelectableNote>>(defaultNotes);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [orderCallback, setOrderCallback] = useState<
		(a: Note, b: Note) => number
	>(() => (a: Note, b: Note) => parseFloat(a.id) - parseFloat(b.id));

	const orderedNotes = useMemo(
		() => [...notes.values()].sort(orderCallback),
		[notes, orderCallback]
	);

	const currentId = [...selectedIds].at(-1) ?? null;
	const [editedNote, setEditedNote] = useState<Note | null>(null);

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
	const deleteNotes = useCallback(() => {
		setNotes((prev) => {
			const next = new Map(prev);
			selectedIds.forEach((id) => next.delete(id));
			return next;
		});
		setSelectedIds(new Set());
	}, [selectedIds]);

    return {
        notes,
        orderedNotes,
        selectedIds,
        setSelectedIds,
        editedNote,
        setEditedNote,
        createNote,
        saveNote,
        deleteNotes,
        orderCallback,
        setOrderCallback,
        currentId
    }
}
