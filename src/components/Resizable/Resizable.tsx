import React, { useEffect, useRef, useState } from "react";
import s from "./Resizable.module.css";
import { Base } from "../../utils/BaseComponent";

type Props = {
	hide?: boolean;
	initSize?: number;
};

export const Resizable = Base<Props>(
	({ children, hide = false, className, initSize = 500 }) => {
		const rootRef = useRef<HTMLDivElement>(null);
		const [size, setSize] = useState<number>(initSize);
		const isDragging = useRef(false);

		const onMouseDown = () => {
			isDragging.current = true;
		};
		const onMouseUp = () => {
			isDragging.current = false;
		};
		const onMouseMove = (e: MouseEvent) => {
			if (!isDragging.current || !rootRef.current) return;
			const rect = rootRef.current.getBoundingClientRect();
			const rectStyle = window.getComputedStyle(rootRef.current);
			const newSize = e.clientX - rect.left - parseFloat(rectStyle.padding) * 2;
			//console.log(rect.left,e.clientX,newSize)
			setSize(Math.max(newSize, 0));
		};
		useEffect(() => {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
			return () => {
				window.removeEventListener("mousemove", onMouseMove);
				window.removeEventListener("mouseup", onMouseUp);
			};
		}, []);

		return (
			<div
				ref={rootRef}
				className={`c-resizable ${s.root} ${hide ? "hide" : ""} ${className}`}
				style={{ width: `${size}px` }}
			>
				{children}
				<div className="divider" onMouseDown={onMouseDown}></div>
			</div>
		);
	}
);
