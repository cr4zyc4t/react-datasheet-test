import React, { useState } from "react";
import ReactDataSheet from "react-datasheet";
import "./DataSheet.scss";

function random(start, end) {
	return Math.floor(Math.random() * (end - start) + 1);
}

function generateData(sizeX, sizeY) {
	let data = [];
	for (let i = 0; i < sizeY; i++) {
		let rowData = [];
		for (let j = 0; j < sizeX; j++) {
			rowData.push({
				value: random(0, 100),
			});
		}
		data.push(rowData);
	}
	return data;
}

export default function DataSheet() {
	const [grid, setGrid] = useState(generateData(20, 20));

	return (
		<div className="container">
			<ReactDataSheet
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
