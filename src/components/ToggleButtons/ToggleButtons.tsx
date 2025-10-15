import React, { useState } from "react";
import s from "./ToggleButtons.module.css";
import type { OutCSS } from "../../types/OutCSS";

type Props<T extends Record<string,React.ReactNode>> = OutCSS & {
	unselectable?: boolean;
	contents:T;
	onToggleKey?: (key: keyof T | null) => void;
	onClickButton?: (key: keyof T) => void;
	activeClass?: string;
};

export function ToggleButtons<T extends Record<string, React.ReactNode>>({
	unselectable = true,
	contents,
	className = "",
	onClickButton = () => {},
	onToggleKey = () => {},
	activeClass = s.active,
}:Props<T>){
	const [currentKey, setCurrentKey] = useState<keyof T | null>(null);
	const toggleKey = (k: keyof T | null) => {
		const isSameKey = k === currentKey;
		let nextKey:keyof T |null = k;
		if(!isSameKey)nextKey = k;
		else if (isSameKey && unselectable) nextKey = null;
		else return;
		setCurrentKey(nextKey);
		onToggleKey(nextKey);
	};

	return (
		<div className={`${s.root} ${className}`}>
			{Object.entries(contents).map(([k, content]) => (
				<button
					key={k}
					onClick={() => {
						onClickButton(k)
						toggleKey(k)
					}}
					className={`
						${s.button} 
						${currentKey === k ? `active ${activeClass}` : ""}
					`}
				>
					{content}
				</button>
			))}
		</div>
	);
};
