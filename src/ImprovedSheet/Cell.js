import React, { memo } from "react";
import DataCell from "react-datasheet/lib/DataCell";
import { useSelector } from "react-redux";

export default memo(function Cell({ row: i, col: j, ...props }) {
	const { start, end, editing, clear, editValue } = useSelector((state) => state);

	const posX = j >= start.j && j <= end.j;
	const negX = j <= start.j && j >= end.j;
	const posY = i >= start.i && i <= end.i;
	const negY = i <= start.i && i >= end.i;

	function isEditing(i, j) {
		return editing.i === i && editing.j === j;
	}

	function isClearing(i, j) {
		return clear.i === i && clear.j === j;
	}

	const isSelected = (posX && posY) || (negX && posY) || (negX && negY) || (posX && negY);
	const isEdit = isEditing(i, j);
	const clearing = isClearing(i, j);

	return (
		<DataCell
			row={i}
			col={j}
			selected={isSelected}
			editting={isEdit}
			clearing={clearing}
			editValue={editValue}
			{...props}
		/>
	);
});
