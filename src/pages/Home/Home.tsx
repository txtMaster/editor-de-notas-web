import { useState } from "react";
import s from "./Home.module.css";
import { NoteList } from "../../components/NoteList/NoteList";
import { SwitchPane } from "../../components/SwitchPane/SwitchPane";
import ConfigIcon from "../../assets/svg/config.svg?react";
import MyNotesIcon from "../../assets/svg/notes.svg?react";
import { ToggleButtons } from "../../components/ToggleButtons/ToggleButtons";
import { Resizable } from "../../components/Resizable/Resizable";
import { NoteEditor } from "../../components/NoteEditor/NoteEditor";
import NoteModel, { SelectableNote } from "../../model/NoteModels";
import { CrudButtons } from "../../components/CrudButtons/CrudButtons";
import { useNoteManager } from "../../hooks/useNotesManager";

const Sections = {
	MyNotes: "mynotes",
	NewNote: "newnote",
	Profile: "profile",
	Config: "config",
	Delete: "delete",
	Reload: "reload",
} as const;

const defaultNotes = new Map<string, SelectableNote>([
	[
		"2",
		new SelectableNote({
			id: "2",
			title: "nota 2",
			content: "contenido 2",
		}),
	],
]);

export const Home = () => {
	const [sectionKey, setSectionKey] = useState<string | null>(null);
	const {
		notes,
		orderedNotes,
		selectedIds,
		setSelectedIds,
		editedNote,
		setEditedNote,
		createNote,
		saveNote,
		deleteNotes,
		currentId,
		orderCallback
	} = useNoteManager(defaultNotes);

	return (
		<div className={s.root}>
			<div className={s.multipane}>
				<ToggleButtons
					className={s.togglebuttons}
					activeClass={s.active}
					onToggleKey={setSectionKey}
					contents={{
						[Sections.Config]: <ConfigIcon />,
						[Sections.MyNotes]: <MyNotesIcon />,
					}}
				/>
				<Resizable className={s.resizable} hide={sectionKey === null}>
					<SwitchPane
						sectionKey={sectionKey}
						sections={{
							[Sections.Config]: <div>configuracion</div>,
							[Sections.MyNotes]: (
								<NoteList
									selecetdIds={selectedIds}
									orderedNotes={orderedNotes}
									className={s.notelist}
									notes={notes}
									orderCallback={orderCallback}
									onSelectIds={setSelectedIds}
									//onDeleteNotes={deleteNotes}
									//onCreateNote={createNote}
								/>
							),
						}}
					/>
				</Resizable>
				<div className={s.editor}>
					<NoteEditor onChange={setEditedNote} note={editedNote} />
					<CrudButtons
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
