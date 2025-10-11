import React, { useRef, useState } from "react";
import s from "./SplitPane.module.css";

type Props = {
	first: React.ReactNode;
	second: React.ReactNode;
};

export const SplitPane: React.FC<Props> = ({ first, second }) => {
	const [firstSize, setFirstSize] = useState<number>(50);
    const rootRef = useRef<HTMLDivElement>(null);
    const firstRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);

	const onMouseDown = () => {
		isDragging.current = true;
	};
	const onMouseUp = () => {
		isDragging.current = false;
	};
	const onMouseMove = (e: MouseEvent) => {
        if(!isDragging.current || !rootRef.current) return;
        const rect = rootRef.current.getBoundingClientRect();
        const newFirstSize = ((e.clientX - rect.left) / rect.width) * 100;
        setFirstSize(Math.min(Math.max(newFirstSize, 0), 100));
    };

	React.useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, []);

	return (
		<div className={s.root} ref={rootRef}>
			<div ref={firstRef} className={s.pane} style={{ width:`${firstSize}%` }}>
                {first}
            </div>
			<div className={s.divider} onMouseDown={onMouseDown}></div>
            <div className={s.pane} style={{ width:`${100 - firstSize}%` }}>
                {second}
            </div>
		</div>
	);
};
