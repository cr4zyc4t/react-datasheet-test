import React, { forwardRef, useState, useCallback, useRef } from "react";
import VirtualizedSheet from "../VirtualizedSheet";
import Cell from "../VirtualizedSheet/Cell";

export default forwardRef(function Sheet({ height, width, data: srcData, onScroll }, ref) {
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
		(scrollData) => {
			if (isHover.current && onScroll) {
				onScroll(scrollData);
			}
		},
		[onScroll]
	);

	return (
		<div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
			<VirtualizedSheet
				ref={ref}
				height={height}
				width={width}
				cellHeight={34}
				cellWidth={60}
				data={data}
				valueRenderer={valueRenderer}
				onCellsChanged={onCellsChanged}
				cellRenderer={Cell}
				onScroll={onGridScroll}
			/>
		</div>
	);
});
