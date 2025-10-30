import type { Editable } from "./Editable";
import type { Selectable } from "./Selectable";
import type { WithDate } from "./WithDate";
import type { WithID } from "./WithID";

export type Note = WithID &
	Selectable &
	Editable &
	WithDate &
	 {
		title: string;
		content: string;
	};

export const createDefaultNote: () => Note = function () {
	return {
		id: "",
		content: "content N",
		title: "title N",
		selected: false,
		state: "created_no_saved",
		created_at: new Date(),
		updated_at: new Date(),
	};
};
