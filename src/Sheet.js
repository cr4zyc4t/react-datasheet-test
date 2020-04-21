import React, { useState } from "react";
import { generateData } from "./utils";
import VirtualizedSheet from "./VirtualizedSheet/VirtualizedSheet";

export default function Sheet() {
	const [grid, setGrid] = useState(generateData(40, 40));

	return (
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
		/>
	);
}
