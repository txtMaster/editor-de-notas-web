import type { Note } from "../../types/Note";
import s from "./NoteList.module.css";
import { NoteCard } from "../NoteCard/NoteCard";
import { Base } from "../../utils/BaseComponent";
import type { SelectableNote } from "../../model/NoteModels";
import { useSelectableList } from "../../hooks/useSelectableList";

type Prop = {
	notes: Map<string, SelectableNote>;
	orderedNotes: SelectableNote[];
	selectedIds: Set<string>;
	onSelectIds?: (ids: Set<string>) => void;
	onDeleteNotes?: (ids: string[]) => void;
	orderCallback: (a: Note, b: Note) => number;
};

export const NoteList = Base<Prop>(
	({
		notes,
		orderedNotes,
		selectedIds,
		onSelectIds = () => {},
		orderCallback,
		className = "",
	}) => {
		const  {
			handleClickItem
		} = useSelectableList(
			notes,
			orderedNotes,
			selectedIds,
			orderCallback,
			onSelectIds
		)

		return (
			<div className={`c-notelist ${className} ${s.root}`}>
				{orderedNotes
					.map(({ id }) => {
						const n = notes.get(id) ?? null;
						if (n === null) return null;
						return (
							<NoteCard
								key={n.id}
								className={n.selected ? "selected" : ""}
								note={n.getBaseData()}
								onClick={(e)=>handleClickItem(e,n.id)}
							/>
						);
					})
					.filter((v) => v !== null)}
			</div>
		);
	}
);
