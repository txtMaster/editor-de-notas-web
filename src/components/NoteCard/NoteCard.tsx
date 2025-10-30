import React from "react";
import s from "./NoteCard.module.css";
import type { OutCSS } from "../../types/OutCSS";
import type { Note } from "../../types/Note";
import { dateToString } from "../../utils/DateUtils";

type Prop = OutCSS & {
	note: Note;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const NoteCard: React.FC<Prop> = ({ note, onClick, className = "" }) => {
	const { title, content, created_at, state } = note;
	return (
		<div
			className={`
      notecard 
      ${s.root} 
      ${className} 
      ${state === "saved" ? "saved" : ""}`}
			onClick={onClick}
		>
			<div className="dates">
				<div className="date">
					<div className="value">{dateToString(created_at)}</div>
				</div>
			</div>
			<div className={`title ${s.title}`}>{title}</div>
			<div className={`content ${s.content}`}>{content}</div>
		</div>
	);
};
