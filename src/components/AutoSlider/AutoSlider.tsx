import React, { useEffect, useRef, useState } from "react";
import type { BaseProps } from "../../types/PropsTypes";
import s from "./AutoSlider.module.css";
type Props = BaseProps & {
	items: string[];
    inteval?: number;
};

export const AutoSlider: React.FC<Props> = ({ items = [],inteval = 3000 }) => {
	const slider = useRef<HTMLDivElement | null>(null);
    const [index,setIndex] = useState<number>(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % items.length);
		}, inteval);
		return () => clearInterval(interval);
	}, [inteval, items.length]);

    useEffect(() => {
        const container = slider.current;
        if (container) {
        const width = container.clientWidth;
        container.scrollTo({
            left: width * index,
            behavior: "smooth",
        });
        }
    }, [index]);

	return (
		<div className={`${s.root} autoslider`}>
			<div ref={slider} className="items">
				{items.map((val, i) => (
					<div key={i}>{val}</div>
				))}
			</div>
			<div className="controls">
				{items.map((_, i) => (
					<div 
					key={i} 
					className={`${i === index ? "active" : ""}`}
					onClick={()=>setIndex(i)}>
                    </div>
				))}
			</div>
		</div>
	);
};
