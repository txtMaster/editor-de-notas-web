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
    disabled?:boolean
}

export const CrudButtons:React.FC<Props> = ({
    disabled = false,
    className = "",
    onAdd = ()=>{},
    onSave = () => {},
    onReload = ()=>{},
    onDelete = ()=>{},
    onShare = ()=>{},
}) => {
	return (
		<div className={`
            crudbuttons ${s.root} ${className} ${disabled ? "disabled" : ""}
        `}>
			<button className="add" onClick={onAdd}>
				<AddIcon />
			</button>
			<button className="save" onClick={onSave} disabled={disabled}>
				<SaveIcon />
			</button>
			<button className="reload" onClick={onReload} disabled={disabled}>
				<ReloadIcon />
			</button>
			<button className="delete" onClick={onDelete} disabled={disabled}>
				<DeleteIcon />
			</button>
			<button className="share" onClick={onShare} disabled={disabled}>
				<ShareIcon />
			</button>
		</div>
	);
};
