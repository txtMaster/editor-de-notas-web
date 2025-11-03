import React, { useState } from "react";
import type { OutCSS } from "../../types/OutCSS";
import ShowIcon from "../../assets/svg/show.svg?react";
import HideIcon from "../../assets/svg/hide.svg?react";
import s from "./PassInput.module.css";

type Props = OutCSS & {
	name: string;
    placeholder:string;
};

export const PassInput: React.FC<Props> = ({ 
    name,
    placeholder = ""
}) => {
    const [isHide,setIsHide] = useState(false);
	return (
		<label className={`${s.root} passinput`}>
            <input 
            type={isHide ? "password" : "text"} 
            name={`${name}`}
            placeholder={placeholder} />
			<button onClick={()=>setIsHide(v=>!v)} type="button">
                {isHide ? <HideIcon/> : <ShowIcon/>}
            </button>
		</label>
	);
};
