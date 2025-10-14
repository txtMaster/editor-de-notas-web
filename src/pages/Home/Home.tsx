import { useState } from "react";
import s from "./Home.module.css";
import { NoteList } from "../../components/NoteList/NoteList";
import { SwitchPane } from "../../components/SwitchPane/SwitchPane";
import ConfigIcon from "../../assets/svg/config.svg?react";
import NotesIcon from "../../assets/svg/notes.svg?react";
import ProfileIcon from "../../assets/svg/profile.svg?react";
import { ToggleButtons } from "../../components/ToggleButtons/ToggleButtons";
import { Resizable } from "../../components/Resizable/Resizable";
import { NoteEditor } from "../../components/NoteEditor/NoteEditor";
import NoteModel, { SelectableNote } from "../../model/NoteModels";
import { CrudButtons } from "../../components/CrudButtons/CrudButtons";
import type { Note } from "../../types/Note";
import { useListManager } from "../../hooks/useListManager";
import { ProfileSection } from "../../components/ProfileSection/ProfileSection";

const Sections = {
	MyNotes: "mynotes",
	NewNote: "newnote",
	Profile: "profile",
	Config: "config",
	Delete: "delete",
	Reload: "reload",
} as const;

const OrderFunctions = {
	id: (a: Note, b: Note) => parseFloat(a.id) - parseFloat(b.id),
	title: (a: Note, b: Note) => a.title.localeCompare(b.title),
	content: (a: Note, b: Note) => a.content.localeCompare(b.content),
};

export const Home = () => {
	const [sectionKey, setSectionKey] = useState<string | null>(null);
	const {
		items: notes,
		orderedItems: orderedNotes,
		selectedIds,
		setSelectedIds,
		currentItem: editedNote,
		setCurrentItem: setEditedNote,
		createItem: createNote,
		saveItem: saveNote,
		deleteSelectedItems: deleteNotes,
		currentId,
		setSortBy,
		setIsAsc,
		isAsc,
		sortBy,
	} = useListManager<Note, SelectableNote>(
		SelectableNote,
		OrderFunctions
	);

	return (
		<div className={s.root}>
			<div className={s.multipane}>
				<ToggleButtons
					className={s.togglebuttons}
					activeClass={s.active}
					onToggleKey={setSectionKey}
					contents={{
						[Sections.Config]: <ConfigIcon />,
						[Sections.MyNotes]: <NotesIcon/>,
						[Sections.Profile]:<ProfileIcon/>
					}}
				/>
				<Resizable className={s.resizable} hide={sectionKey === null}>
					<SwitchPane
						className={s.switchpane}
						sectionKey={sectionKey}
						sections={{
							[Sections.Config]: <div>configuracion</div>,
							[Sections.MyNotes]: (
								<div className={s.listpane}>
									<ToggleButtons
										unselectable={false}
										className={`${s.togglebuttons} ${s.toggleorder}`}
										activeClass={s.active}
										onClickButton={(k) => {
											console.log(sortBy === k);
											if (!k) return;
											if (sortBy === k) setIsAsc((pre) => !pre);
											else setSortBy(k);
										}}
										contents={{
											id: "id",
											content: "content",
											title: "title",
										}}
									/>
									<NoteList
										selectedIds={selectedIds}
										orderedNotes={orderedNotes}
										className={s.notelist}
										notes={notes}
										orderCallback={OrderFunctions[sortBy]}
										isReverse={isAsc}
										onSelectIds={setSelectedIds}
										//onDeleteNotes={deleteNotes}
										//onCreateNote={createNote}
									/>
								</div>
							),
							[Sections.Profile]:
							<ProfileSection className={s.profile}></ProfileSection>
						}}
					/>
				</Resizable>
				<div className={s.editor}>
					<NoteEditor onChange={setEditedNote} note={editedNote} />
					<CrudButtons
						disabled={editedNote === null}
						className={s.crudbuttons}
						onAdd={() => createNote(NoteModel.default())}
						onSave={() => saveNote(editedNote)}
						onReload={() => {
							setEditedNote(notes.get(currentId ?? "") ?? null);
						}}
						onDelete={() => deleteNotes()}
					/>
				</div>
			</div>
		</div>
	);
};
