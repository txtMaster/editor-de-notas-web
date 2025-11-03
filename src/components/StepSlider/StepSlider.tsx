import React from "react";
import s from "./StepSlider.module.css";
import type { BaseProps } from "../../types/PropsTypes";

type Props = BaseProps & {
	current: number;
};

export const StepSlider: React.FC<Props> = ({
	current = 0,
    children,
    className = ""
}) => {
	return (
		<div className={`stepslider ${className} ${s.root}`}>
			<div
				className={s.slider + " slider"}
				style={{"--step":current } as React.CSSProperties}
			>
				{children}
			</div>
		</div>
	);
};
