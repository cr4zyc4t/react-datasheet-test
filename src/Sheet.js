import React, { useState } from "react";
import { generateData } from "./utils";
import "react-datasheet/lib/react-datasheet.css";
import VirtualizedSheet from "./VirtualizedSheet";
import { AutoSizer } from "react-virtualized";
import Cell from "./VirtualizedSheet/Cell";

export default function Sheet() {
	const [grid, setGrid] = useState(generateData(2000, 2000));

	return (
		<div style={{ height: 600, width: 800 }}>
			<AutoSizer>
				{({ height, width }) => (
					<VirtualizedSheet
						height={height}
						width={height}
						cellHeight={34}
						cellWidth={60}
						data={grid}
						valueRenderer={(cell) => cell.value}
						onCellsChanged={(changes) => {
							const newGrid = grid.map((row) => [...row]);
							changes.forEach(({ cell, row, col, value }) => {
								newGrid[row][col] = { ...newGrid[row][col], value };
							});
							setGrid(newGrid);
						}}
						cellRenderer={Cell}
					/>
				)}
			</AutoSizer>
		</div>
	);
}
