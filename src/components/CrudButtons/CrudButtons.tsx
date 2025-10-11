import React from "react";
import s from "./CrudButtons.module.css"
import ShareIcon from "../../assets/svg/share.svg?react";
import SaveIcon from "../../assets/svg/save.svg?react";
import DeleteIcon from "../../assets/svg/delete.svg?react";
import ReloadIcon from "../../assets/svg/reload.svg?react";
import AddIcon from "../../assets/svg/add.svg?react";
import type { BasicComponent } from "../../types/BasicComponent";

type Props = BasicComponent & {
    onAdd?:()=>void
    onSave?:()=>void
    onReload?:()=>void
    onDelete?:()=>void
    onShare?:()=>void
}

export const CrudButtons:React.FC<Props> = ({
    className = "",
    onAdd = ()=>{},
    onSave = () => {},
    onReload = ()=>{},
    onDelete = ()=>{},
    onShare = ()=>{},
}) => {
	return (
		<div className={`c-crudbuttons ${s.root} ${className}`}>
			<button className="add" onClick={onAdd}>
				<AddIcon />
			</button>
			<button className="save" onClick={onSave}>
				<SaveIcon />
			</button>
			<button className="reload" onClick={onReload}>
				<ReloadIcon />
			</button>
			<button className="delete" onClick={onDelete}>
				<DeleteIcon />
			</button>
			<button className="share" onClick={onShare}>
				<ShareIcon />
			</button>
		</div>
	);
};
