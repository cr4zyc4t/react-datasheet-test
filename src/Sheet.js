import React, { useState } from "react";
import { generateData } from "./utils";
import "react-datasheet/lib/react-datasheet.css";
import VirtualizedSheet from "./VirtualizedSheet";

export default function Sheet() {
	const [grid, setGrid] = useState(generateData(20, 20));

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
			/>
		</div>
	);
}
