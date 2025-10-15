import  { useEffect, useRef, useState } from "react";
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

		const onPointerDown = () => {
			isDragging.current = true;
		};
		const onPointerUp = () => {
			isDragging.current = false;
		};
		const onPointerMove = (e: PointerEvent) => {
			if (!isDragging.current || !rootRef.current) return;
			const rect = rootRef.current.getBoundingClientRect();
			const rectStyle = window.getComputedStyle(rootRef.current);
			const newSize = e.clientX - rect.left - parseFloat(rectStyle.padding) * 2;
			setSize(Math.max(newSize, 0));
		};
		useEffect(() => {
			window.addEventListener("pointermove", onPointerMove);
			window.addEventListener("pointerup", onPointerUp);
			return () => {
				window.removeEventListener("pointermove", onPointerMove);
				window.removeEventListener("pointerup", onPointerUp);
			};
		}, []);

		return (
			<div
				ref={rootRef}
				className={`c-resizable ${s.root} ${hide ? "hide" : ""} ${className}`}
				style={{ width: `${size}px` }}
			>
				{children}
				<div className="divider" onPointerDown={onPointerDown}></div>
			</div>
		);
	}
);
