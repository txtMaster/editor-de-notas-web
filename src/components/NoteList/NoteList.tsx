import s from "./NoteList.module.css";
import { NoteCard } from "../NoteCard/NoteCard";
import { useSelectableList } from "../../hooks/useSelectableList";
import type { Note } from "../../types/Note";
import type { OrderCallback } from "../../types/OrderCallback";
import type { BaseProps } from "../../types/PropsTypes";

type Props = BaseProps & {
	notes: Map<string, Note>;
	orderedNotes: Note[];
	selectedIds: Set<string>;
	orderCallback?: OrderCallback<Note>;
	isReverse:boolean
	onSelectIds?: (ids: Set<string>) => void;
	onDeleteNotes?: (ids: string[]) => void;
};

export const NoteList: React.FC<Props> = (
	({
		notes,
		orderedNotes,
		selectedIds,
		onSelectIds = () => {},
		orderCallback = ()=>0,
		className = "",
		isReverse = false
	}) => {
		const  {
			handleClickItem
		} = useSelectableList(
			notes,
			orderedNotes,
			selectedIds,
			orderCallback,
			isReverse,
			onSelectIds
		)

		return (
			<div className={`notelist ${className} ${s.root}`}>
				{orderedNotes
					.map(({ id }) => {
						const n = notes.get(id) ?? null;
						if (n === null) return null;
						return (
							<NoteCard
								key={n.id}
								className={n.selected ? "selected" : ""}
								note={n}
								onClick={(e)=>handleClickItem(e,n.id)}
							/>
						);
					})
					.filter((v) => v !== null)}
			</div>
		);
	}
);
