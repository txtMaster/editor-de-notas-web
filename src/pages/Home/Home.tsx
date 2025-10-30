import { useState } from "react";
import s from "./Home.module.css";
import { NoteList } from "../../components/NoteList/NoteList";
import { SwitchPane } from "../../components/SwitchPane/SwitchPane";
import ConfigIcon from "../../assets/svg/config.svg?react";
import NotesIcon from "../../assets/svg/notes.svg?react";
import ProfileIcon from "../../assets/svg/profile.svg?react";
import ArrowUpIcon from "../../assets/svg/arrow-up.svg?react";
import { ToggleButtons } from "../../components/ToggleButtons/ToggleButtons";
import { Resizable } from "../../components/Resizable/Resizable";
import { NoteEditor } from "../../components/NoteEditor/NoteEditor";
import { CrudButtons } from "../../components/CrudButtons/CrudButtons";
import { ProfileSection } from "../../components/ProfileSection/ProfileSection";
import { createDefaultNote} from "../../types/Note";
import { useNotesManager } from "../../hooks/useNotesManager";

const Sections = {
	MyNotes: "mynotes",
	NewNote: "newnote",
	Profile: "profile",
	Config: "config",
	Delete: "delete",
	Reload: "reload",
} as const;

export const Home = () => {
	const [sectionKey, setSectionKey] = useState<string | null>(null);
	const {
		orderFuctions,
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
	} = useNotesManager();

	return (
		<div className={s.home}>
			<ToggleButtons
				className={`
						${s.togglebuttons}
						${s.togglesections}
					`}
				activeClass={s.active}
				onToggleKey={setSectionKey}
				contents={{
					[Sections.MyNotes]: (
						<>
							<NotesIcon />
							notes
						</>
					),
					[Sections.Config]: (
						<>
							<ConfigIcon />
							config
						</>
					),
					[Sections.Profile]: (
						<>
							<ProfileIcon />
							profile
						</>
					),
				}}
			/>
			<Resizable className={s.resizable} hide={sectionKey === null}>
				<SwitchPane
					className={s.switchpane}
					sectionKey={sectionKey}
					sections={{
						[Sections.Config]: <div>configuracion</div>,
						[Sections.MyNotes]: (
							<article className={s.explorer}>
								<div className={s.folders}>
									<div className={s.dir}>
										Home
										<div>../subfolder/currentFolder</div>
									</div>
									<label className={s.foldername}>
										Folder name:
										<input type="text" />
										<button>save</button>
									</label>
								</div>
								<div className={s.notes}>
									<div className={s.filter}>
										Filters:
										<ToggleButtons
											unselectable={false}
											className={`
											${s.toggleorder}
											${isAsc ? s.asc : ""}
										`}
											activeClass={s.active}
											onClickButton={(k) => {
												if (!k) return;
												if (sortBy === k) setIsAsc((pre) => !pre);
												else setSortBy(k);
											}}
											contents={{
												title: (
													<>
														title
														<ArrowUpIcon />
													</>
												),
												created_at: (
													<>
														created at
														<ArrowUpIcon />
													</>
												),

											}}
										/>
									</div>
									<NoteList
										selectedIds={selectedIds}
										orderedNotes={orderedNotes}
										className={s.notelist}
										notes={notes}
										orderCallback={orderFuctions[sortBy]}
										isReverse={isAsc}
										onSelectIds={setSelectedIds}
									/>
								</div>
							</article>
						),
						[Sections.Profile]: (
							<ProfileSection className={s.profile}></ProfileSection>
						),
					}}
				/>
			</Resizable>
			<div className={s.editor}>
				<NoteEditor onChange={setEditedNote} note={editedNote} />
				<CrudButtons
					disabled={editedNote === null}
					className={s.crudbuttons}
					onAdd={() => createNote(createDefaultNote())}
					onSave={() => saveNote(editedNote)}
					onReload={() => {
						setEditedNote(notes.get(currentId ?? "") ?? null);
					}}
					onDelete={() => deleteNotes()}
				/>
			</div>
		</div>
	);
};
