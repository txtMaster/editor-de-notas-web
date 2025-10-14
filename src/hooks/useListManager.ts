import { useCallback, useEffect, useMemo, useState } from "react";
import { SelectableModel } from "../model/BaseModel";
import type { OrderCallback } from "../types/OrderCallback";
import type { WithID } from "../types/WithID";

export function useListManager<
	Data extends WithID,
	Model extends SelectableModel<Data>
>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ModelClass: new (...args: any[]) => Model,
	sortFns: Record<keyof Data, OrderCallback<Data>>,
	defaultItems: Map<string, Model> = new Map()
) {
	const [sortBy, setSortBy] = useState<keyof Data>(
		Object.keys(sortFns)[0] as keyof Data
	);
	const [isAsc, setIsAsc] = useState<boolean>(true);

	const [items, setItems] = useState<Map<string, Model>>(defaultItems);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

	const orderedItems: Model[] = useMemo(() => {
		const sorted = [...items.values()].sort((a, b) => {
			return sortFns[sortBy](a.getBaseData(), b.getBaseData());
		});
		return isAsc ? sorted : sorted.reverse();
	}, [isAsc, items, sortBy, sortFns]);

	const currentId = [...selectedIds].at(-1) ?? null;
	const [currentItem, setCurrentItem] = useState<Data | null>(null);

	//editar los attrs "selected" de las notas cuando se editan las ids selecionadas
	useEffect(() => {
		setItems((prev) => {
			const updated = new Map(prev);
			for (const [id, note] of prev) {
				const isSelected = selectedIds.has(id);
				if (note.selected !== isSelected) {
					note.selected = isSelected;
					updated.set(id, note);
				}
			}
			return updated;
		});
	}, [selectedIds]);
	//se actualiza la nota editada, asignandole la nota del ultimo id seleccionado
	useEffect(() => {
		setCurrentItem(items.get(currentId ?? "")?.getBaseData() ?? null);
	}, [currentId, items, selectedIds]);

	const createItem = useCallback(
		(item: Data) => {
			let id: string;
			do id = Math.floor(Math.random() * 100).toString();
			while (items.has(id));

			const newNote = new ModelClass({ ...item, id });
			setItems((pre) => new Map(pre).set(id, newNote));
			setSelectedIds(new Set([id]));
		},
		[ModelClass, items]
	);
	//callback para cuando guardar un item
	const saveItem = useCallback((note: Data | null = null) => {
		if (!note) return;
		setItems((prev) => {
			const updated = new Map(prev);
			const existing = prev.get(note.id);
			let updatedModel: Model;
			if (existing) {
				updatedModel = existing;
				updatedModel.setBaseData(note);
			} else {
				updatedModel = new ModelClass({ ...note });
			}
			setSelectedIds(new Set([note.id]));
			updated.set(updatedModel.id, updatedModel);
			return updated;
		});
	}, [ModelClass]);

    	//callback para borrar todas las notas seleccionadas
	const deleteSelectedItems = useCallback(() => {
		setItems((prev) => {
			const next = new Map(prev);
			selectedIds.forEach((id) => next.delete(id));
			return next;
		});
		setSelectedIds(new Set());
	}, [selectedIds]);


    	return {
		/**Map con todas las notas existentes */
		items,
		/**Array con las notas ordenadas */
		orderedItems,
		/**Set con las ids de las notas selecionadas */
		selectedIds,
		setSelectedIds,
		/**nota seleccionada para editar */
		currentItem,
		/**id de la ultima nota seleccionada */
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
