import React, { useCallback, useState } from "react";
export function useStepSlider(steps: React.ReactNode[] = []) {
	const [current, setCurrent] = useState(0);

	const next = useCallback(() => {
        console.log("next")
		setCurrent((pre) => Math.min(pre + 1, steps.length - 1));
	}, [steps.length]);
	const prev = useCallback(() => {
		setCurrent((pre) => Math.max(pre - 1, 0));
	}, []);

    return {
        steps,
        current,
        next,
        prev
    }
}
