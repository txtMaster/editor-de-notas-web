import type { Note } from "../../types/Note";
import s from "./NoteList.module.css";
import { NoteCard } from "../NoteCard/NoteCard";
import { Base } from "../../utils/BaseComponent";
import type { SelectableNote } from "../../model/NoteModels";
import { useState } from "react";

type Prop = {
	notes: Map<string, SelectableNote>;
	orderedNotes: SelectableNote[];
	selecetdIds: Set<string>;
	onSelectIds?: (ids: Set<string>) => void;
	onDeleteNotes?: (ids: string[]) => void;
	orderCallback: (a: Note, b: Note) => number;
};

export const NoteList = Base<Prop>(
	({
		notes,
		orderedNotes,
		selecetdIds,
		onSelectIds = () => {},
		orderCallback,
		className = "",
	}) => {
		const [lastSelected, setLastSelected] = useState<string | null>(null);

		const onSelectOne = (id: string) => {
			if (selecetdIds.size > 0 && selecetdIds.has(id)) selecetdIds.delete(id);
			else {
				selecetdIds.add(id)
				setLastSelected(id)
			};
			onSelectIds(new Set(selecetdIds));
		};

		const selectOne = (id: string) => {
			setLastSelected(id);
			return new Set([id]);
		};
		const selectInRange = (endId: string) => {
			const startId = lastSelected;
			if (!startId) return selectOne(endId);
			let startNote = notes.get(startId);
			let endNote = notes.get(endId);
			if (!startNote || !endNote) return new Set<string>();

			if (startId === endId) return selectOne(endId);

			const range: string[] = [...selecetdIds];
			const reversed = orderCallback(startNote, endNote) > 0;
			if (reversed) [endNote, startNote] = [startNote, endNote];
			const add = reversed
				? (id: string) => range.unshift(id)
				: (id: string) => range.push(id);
			let collecting = false;

			for (const value of orderedNotes) {
				if (value.id === startNote.id) collecting = true;
				if (collecting) add(value.id);
				if (value.id === endNote.id) break;
			}
			setLastSelected(endId);
			return new Set(range);
		};
		return (
			<div className={`c-notelist ${className} ${s.root}`}>
				{orderedNotes
					.map(({id}) => {
						const n = notes.get(id) ?? null;
						if (n === null) return null;
						return (
							<NoteCard
								key={n.id}
								className={n.selected ? "selected" : ""}
								note={n.getBaseData()}
								onClick={(e) => {
									if (e.ctrlKey) {
										onSelectOne(n.id);
									} else {
										const toSelect = !e.shiftKey
											? selectOne(n.id)
											: selectInRange(n.id);
										onSelectIds(toSelect);
									}
								}}
							/>
						);
					})
					.filter((v) => v !== null)}
			</div>
		);
	}
);
