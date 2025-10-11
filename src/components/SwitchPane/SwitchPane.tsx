import React, { useRef } from "react";
import s from "./SwitchPane.module.css";
import type { OutCSS } from "../../types/OutCSS";

type Prop = OutCSS & {
	sections: Record<string,React.ReactNode>;
	sectionKey: string | null;
};

export const SwitchPane: React.FC<Prop> = ({
	sections,
	sectionKey,
	className = "",
}) => {
	const sectionRef = useRef<React.ReactNode>(null);
	const nextSection: React.ReactNode = sections[sectionKey ?? ""];

	const rootClassName = `
	c-switchpane
	${className} 
	${s.root} ${!nextSection ? s.hidden : ""}
	`;

	if (nextSection != null) {
		sectionRef.current = nextSection;
	}

	return <div className={rootClassName}>{sectionRef.current}</div>;
};
