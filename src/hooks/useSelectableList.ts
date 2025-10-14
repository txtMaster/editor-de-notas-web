import { useCallback, useState } from "react";
import type { Selectable } from "../types/Selectable";
import type { WithID } from "../types/WithID";

//hook para poder seleccionar varios elementos de una lista
export function useSelectableList<T extends Selectable & WithID>(
	items: Map<string, T>,
	orderedItems: T[],
	selectedIds: Set<string>,
	orderCallback: (a: T, b: T) => number,
	isReverse: boolean = false,
	onSelectionChange: (selected: Set<string>) => void = () => {}
) {
	const [lastSelected, setLastSelected] = useState<string | null>(null);

	const notifyChange = useCallback(
		(set: Set<string>) => {
			onSelectionChange?.(set);
		},
		[onSelectionChange]
	);

	const selectSingle = useCallback(
		(id: string) => {
			setLastSelected(id);
			notifyChange(new Set([id]));
		},
		[notifyChange]
	);

	const toggleSelect = useCallback(
		(id: string) => {
			const newSelectedIds = new Set(selectedIds);
			if (newSelectedIds.has(id)) newSelectedIds.delete(id);
			else {
				newSelectedIds.add(id);
				setLastSelected(id);
			}
			notifyChange(newSelectedIds);
		},
		[notifyChange, selectedIds]
	);

	const selectRange = useCallback(
		(endId: string) => {
			const startId = lastSelected;
			if (!startId) return selectSingle(endId);
			let startNote = items.get(startId);
			let endNote = items.get(endId);
			if (!startNote || !endNote) return new Set<string>();

			if (startId === endId) return selectSingle(endId);

			const range: string[] = [...selectedIds];
			/*
			const reversed = !isReverse
				? orderCallback(startNote, endNote) > 0
				: orderCallback(startNote, endNote) < 0;
			*/
			console.log(startNote, endNote);
			console.log(orderCallback, orderCallback(startNote, endNote));
			const toDown = isReverse
				? orderCallback(startNote, endNote) > 0
				: orderCallback(startNote, endNote) < 0;
			console.log("todown:", toDown);
			if (toDown) [endNote, startNote] = [startNote, endNote];
			const add = toDown
				? (id: string) => range.unshift(id)
				: (id: string) => range.push(id);
			let collecting = false;

			for (const value of orderedItems) {
				if (value.id === startNote.id) collecting = true;
				if (collecting) add(value.id);
				if (value.id === endNote.id) break;
			}
			setLastSelected(endId);
			notifyChange(new Set(range));
		},
		[
			isReverse,
			items,
			lastSelected,
			notifyChange,
			orderCallback,
			orderedItems,
			selectSingle,
			selectedIds,
		]
	);
	const handleClickItem = useCallback(
		(e: React.MouseEvent, id: string) => {
			if (e.ctrlKey) toggleSelect(id);
			else if (e.shiftKey) selectRange(id);
			else selectSingle(id);
		},
		[selectRange, selectSingle, toggleSelect]
	);

	const clearSelection = useCallback(() => {
		setLastSelected(null);
		notifyChange(new Set());
	}, [notifyChange]);

	return {
		selectedIds,
		setSelectedIds: notifyChange,
		lastSelected,
		selectSingle,
		selectRange,
		toggleSelect,
		handleClickItem,
		clearSelection,
	};
}
