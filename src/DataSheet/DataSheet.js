import React, { useState, useCallback, useRef } from "react";
import ReactDataSheet from "react-datasheet";
import "./DataSheet.scss";
import { range } from "../utils";

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

export default function DataSheet({ gridSize }) {
	const [grid, setGrid] = useState(generateData(gridSize.x, gridSize.y));
	const containerRef = useRef(null);
	const xAxisRef = useRef(null);
	const yAxisRef = useRef(null);

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

	const handleAxisScroll = useCallback((e) => {
		xAxisRef.current.scrollLeft = e.currentTarget.scrollLeft;
		yAxisRef.current.scrollTop = e.currentTarget.scrollTop;
	}, []);

	return (
		<div className="wrapper">
			<div className="xAxis" ref={xAxisRef}>
				<div className="xAxis-cells">
					{range(gridSize.x).map((v, i) => {
						return (
							<div key={i} className="cell">
								{i}
							</div>
						);
					})}
				</div>
			</div>
			<div className="yaXis" ref={yAxisRef}>
				<div className="yAxis-cells">
					{range(gridSize.y).map((v, i) => {
						return (
							<div key={i} className="cell">
								{i}
							</div>
						);
					})}
				</div>
			</div>
			<div className="container" ref={containerRef} onScroll={handleAxisScroll}>
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
		</div>
	);
}
