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
					<div className="value">20-22-2025</div>
				</div>
				<div className="date">
					<div className="name">Updated:</div>
					<div className="value">20-22-2025</div>
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
