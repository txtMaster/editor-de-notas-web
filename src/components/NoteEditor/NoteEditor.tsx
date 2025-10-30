import React from "react";
import type { OutCSS } from "../../types/OutCSS";
import s from "./NoteEditor.module.css";
import { createDefaultNote, type Note } from "../../types/Note";
import { dateToFullString} from "../../utils/DateUtils";

type Props = OutCSS & {
	note: Note | null;
	onChange?: (note: Note) => void;
};

export const NoteEditor: React.FC<Props> = ({
	note = createDefaultNote(),
	className = "",
	onChange = () => {},
}) => {
	return (
		<div className={`noteeditor ${s.root} ${className}`}>
			<label className="title">
				Title
				<input
					type="text"
					id="title"
					className="title"
					placeholder="Note name here!!"
					value={note?.title ?? ""}
					onChange={({ target }) => {
						if (note !== null) onChange({ ...note, title: target.value });
					}}
				/>
			</label>
			<div className="dates">
				<div className="date">
					<div className="name">Created:</div>
					<div className="value">{dateToFullString(note?.created_at)}</div>
				</div>
				<div className="date">
					<div className="name">Updated:</div>
					<div className="value">{dateToFullString(note?.updated_at)}</div>
				</div>
			</div>
			<label className="content">
				<textarea
					id="content"
					className="content"
					placeholder="Write anything here"
					value={note?.content ?? ""}
					onChange={({ target }) => {
						if (note !== null) onChange({ ...note, content: target.value });
					}}
				/>
			</label>
		</div>
	);
};
