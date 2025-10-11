import React, { useEffect, useState } from "react";
import type { OutCSS } from "../../types/OutCSS";
import { type Note } from "../../types/Note";
import s from "./NoteEditor.module.css";
import NoteModel from "../../model/NoteModels";

type Props = OutCSS & {
	note: Note | null;
	onChange?: (note: Note) => void;
};

export const NoteEditor: React.FC<Props> = ({
	note = NoteModel.default(),
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
					placeholder="title"
					value={note?.title ?? ""}
					onChange={({ target }) => {
						if (note !== null) onChange({ ...note, title: target.value });
					}}
				/>
			</label>
			<label className="content">
				Content
				<textarea
					id="content"
					className="content"
					placeholder="Content"
					value={note?.content ?? ""}
					onChange={({ target }) => {
						if (note !== null) onChange({ ...note, content: target.value });
					}}
				/>
			</label>
		</div>
	);
};
