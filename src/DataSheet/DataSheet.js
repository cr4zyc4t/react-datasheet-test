import React, { useState, useCallback, useRef } from "react";
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
	const containerRef = useRef(null);

	const onSelect = useCallback(({ end }) => {
		const container = containerRef.current;
		const maxI = end.i;
		const maxJ = end.j;

		// Check if not in vertical viewpot
		if (container.scrollTop > maxI * 30) {
			container.scrollTop = maxI * 30;
		} else if (container.scrollTop + 400 < (maxI + 1) * 30) {
			container.scrollTop = (maxI + 1) * 30 - 400;
		}
		// Check if not in horizontal viewpot
		if (container.scrollLeft > maxJ * 50) {
			container.scrollLeft = maxJ * 50;
		} else if (container.scrollLeft + 400 < (maxJ + 1) * 50) {
			container.scrollLeft = (maxJ + 1) * 50 - 400;
		}
	}, []);

	return (
		<div className="container" ref={containerRef}>
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
				onSelect={onSelect}
			/>
		</div>
	);
}
