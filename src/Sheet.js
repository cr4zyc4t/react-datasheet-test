import React, { useState } from "react";
import { generateData } from "./utils";
import VirtualizedSheet from "./VirtualizedSheet/VirtualizedSheet";

export default function Sheet() {
	const [grid, setGrid] = useState(generateData(100, 100));

	return (
		<div style={{ height: 600, width: 600 }}>
			<VirtualizedSheet
				data={grid}
				valueRenderer={(cell) => cell.value}
				onCellsChanged={(changes) => {
					const newGrid = grid.map((row) => [...row]);
					changes.forEach(({ cell, row, col, value }) => {
						newGrid[row][col] = { ...newGrid[row][col], value };
					});
					setGrid(newGrid);
				}}
				// selected={{
				// 	start: { i: 0, j: 0 },
				// 	end: { i: 1, j: 1 },
				// }}
			/>
		</div>
	);
}
