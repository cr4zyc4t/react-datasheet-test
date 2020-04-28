import React, { memo } from "react";
// import DataCell from "react-datasheet/lib/DataCell";
// import { areEqual } from "react-window";
import Cell from "./Cell";

const areEqual = (prevProps, nextProps) => {
	const keys = Object.keys(prevProps);
	if (keys.length !== Object.keys(nextProps).length) {
		return false;
	}
	for (const key of keys) {
		if (prevProps[key] !== nextProps[key]) {
			return false;
		}
	}
	return true;
};

export default memo(function Sheet({
	SheetRenderer,
	data,
	className,
	overflow,
	RowRenderer,
	keyFn,
	forceEdit,
	attributesRenderer,
	cellRenderer,
	valueRenderer,
	dataRenderer,
	valueViewer,
	dataEditor,

	onMouseDown,
	onMouseOver,
	onDoubleClick,
	onContextMenu,
	onChange,
	onRevert,
	onNavigate,
	onKey,
	// isSelected,
	// isEditing,
	// isClearing,
	// editValue,
	onEdit,
}) {
	return (
		<SheetRenderer
			data={data}
			className={["data-grid", className, overflow].filter((a) => a).join(" ")}>
			{data.map((row, i) => (
				<RowRenderer key={keyFn ? keyFn(i) : i} row={i} cells={row}>
					{row.map((cell, j) => {
						// const isEdit = isEditing(i, j);
						return (
							<Cell
								key={cell.key ? cell.key : `${i}-${j}`}
								row={i}
								col={j}
								cell={cell}
								forceEdit={forceEdit}
								attributesRenderer={attributesRenderer}
								cellRenderer={cellRenderer}
								valueRenderer={valueRenderer}
								dataRenderer={dataRenderer}
								valueViewer={valueViewer}
								dataEditor={dataEditor}
								onMouseDown={onMouseDown}
								onMouseOver={onMouseOver}
								onDoubleClick={onDoubleClick}
								onContextMenu={onContextMenu}
								onChange={onChange}
								onRevert={onRevert}
								onNavigate={onNavigate}
								onKey={onKey}
								// editing={isEdit}
								// clearing={isClearing(i, j)}
								// editValue={editValue}
								onEdit={onEdit}
							/>
						);
					})}
				</RowRenderer>
			))}
		</SheetRenderer>
	);
}, areEqual);
