import { useCallback, useEffect, useMemo, useState } from "react";
import type { OrderCallbackObject } from "../types/OrderCallback";
import type { Selectable } from "../types/Selectable";
import type { WithID } from "../types/WithID";
import type { WithDate } from "../types/WithDate";
import type { Editable } from "../types/Editable";

export function useListManager<
T extends Selectable & WithID & WithDate & Editable
>(
	defaultItem: T,
	sortFns: OrderCallbackObject<T>,
	defaultItems: Map<string, T> = new Map()
) {
	const [sortBy, setSortBy] = useState<keyof T>(
		(Object.keys(sortFns) as Array<keyof T>)[0] as keyof T
	);
	const [isAsc, setIsAsc] = useState<boolean>(true);

	const [items, setItems] = useState<Map<string, T>>(defaultItems);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const orderedItems: T[] = useMemo(() => {
		const orderCallback = sortFns[sortBy] ?? null;
		if(!orderCallback)return [...items.values()];
		const sorted = [...items.values()].sort((a, b) => {
			return orderCallback(a, b);
		});
		return isAsc ? sorted : sorted.reverse();
	}, [isAsc, items, sortBy, sortFns]);

	const currentId = [...selectedIds].at(-1) ?? null;
	const [currentItem, setCurrentItem] = useState<T | null>(null);

	//editar los attrs "selected" de los items cuando se editan las ids selecionadas
	useEffect(() => {
		setItems((prev) => {
			const updated = new Map(prev);
			for (const [id, item] of prev) {
				const isSelected = selectedIds.has(id);
				if (item.selected !== isSelected) {
					item.selected = isSelected;
					updated.set(id, item);
				}
			}
			return updated;
		});
	}, [selectedIds]);
	//se actualiza el item editado, asignandole el item del ultimo id seleccionado
	useEffect(() => {
		setCurrentItem(items.get(currentId ?? "") ?? null);
	}, [currentId, items, selectedIds]);

	const createItem = useCallback(
		(item: T) => {
			let id: string;
			do id = Math.floor(Math.random() * 100).toString();
			while (items.has(id));

			const newItem = {...defaultItem, ...item, id };
			setItems((pre) => new Map(pre).set(id, newItem));
			setSelectedIds(new Set([id]));
		},
		[defaultItem, items]
	);
	//callback para cuando guardar un item
	const saveItem = useCallback((item: T | null = null) => {
		if (!item) return;
		setItems((prev) => {
			const updated = new Map(prev);
			const existing = prev.get(item.id);
			let updatedItem: T;
			if (existing) {
				updatedItem = existing;
				updatedItem = {...item};
			} else {
				updatedItem = { ...item };
			}
			updatedItem.updated_at = new Date();
			updatedItem.state = "saved";
			setSelectedIds(new Set([item.id]));
			updated.set(updatedItem.id, updatedItem);
			return updated;
		});
	}, []);

    	//callback para borrar todas los items seleccionados
	const deleteSelectedItems = useCallback(() => {
		setItems((prev) => {
			const next = new Map(prev);
			selectedIds.forEach((id) => next.delete(id));
			return next;
		});
		setSelectedIds(new Set());
	}, [selectedIds]);


    	return {
		/**Map con todas los items existentes */
		items,
		/**Array con los items ordenados */
		orderedItems,
		/**Set con las ids de los items seleccionados */
		selectedIds,
		setSelectedIds,
		/**item seleccionado para editar */
		currentItem,
		/**id del ultimo item seleccionado */
		currentId,
		setCurrentItem,
		createItem,
		saveItem,
		deleteSelectedItems,
		setSortBy,
		sortBy,
		setIsAsc,
		isAsc
	};
}
