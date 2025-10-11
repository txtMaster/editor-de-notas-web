import React, { useState, type JSX } from "react";
import s from "./ToggleButtons.module.css";
import type { OutCSS } from "../../types/OutCSS";

type Props = OutCSS & {
	unselectable ?:boolean
	contents: { [key: string]: JSX.Element };
	onToggleKey?: (key: string | null) => void;
	activeClass?:string;
};

export const ToggleButtons: React.FC<Props> = ({
	unselectable = true,
	contents,
	className = "",
	onToggleKey = () => {},
	activeClass = s.active
}) => {
	const [currentKey,setCurrentKey] = useState<string | null>(null);
	const toggleKey = (k: string | null) => {
		const nextKey = k === currentKey ? null : k;
		if(nextKey === null && !unselectable)return;
		setCurrentKey(nextKey);
		onToggleKey(nextKey);
	};

	return (
		<div className={`${s.root} ${className}`}>
			{Object.entries(contents).map(([k, content]) => (
				<button 
					key={k} 
					onClick={() => toggleKey(k)}
					className={`${s.button} ${currentKey === k ? activeClass : ""}`}>
					{content}
				</button>
			))}
		</div>
	);
};
