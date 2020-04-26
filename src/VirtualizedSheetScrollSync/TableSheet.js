import React, { forwardRef, useState, useCallback, useRef } from "react";
import Cell from "../VirtualizedSheet/Cell";
import ReactDataSheet from "react-datasheet";

export default forwardRef(function TableSheet({ height, width, data: srcData, onScroll }, ref) {
	const [data, setData] = useState(srcData);
	const isHover = useRef(false);

	const valueRenderer = useCallback((cell) => cell.value, []);

	const onCellsChanged = (changes) => {
		const newGrid = data.map((row) => [...row]);
		changes.forEach(({ cell, row, col, value }) => {
			newGrid[row][col] = { ...newGrid[row][col], value };
		});
		setData(newGrid);
	};

	const onMouseEnter = useCallback(() => (isHover.current = true), []);
	const onMouseLeave = useCallback(() => (isHover.current = false), []);
	const onGridScroll = useCallback(
		(e) => {
			if (isHover.current && onScroll) {
				onScroll(e.currentTarget.scrollTop);
			}
		},
		[onScroll]
	);

	return (
		<div
			ref={ref}
			style={{ height, width, overflow: "auto" }}
			onScroll={onGridScroll}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}>
			<ReactDataSheet data={data} valueRenderer={valueRenderer} onCellsChanged={onCellsChanged} />
		</div>
	);
});
