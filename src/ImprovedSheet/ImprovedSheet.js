import React, { Component } from "react";
import { generateData } from "../utils";
import urlParser from "url-parse";
import "react-datasheet/lib/react-datasheet.css";
import DataSheet from "./DataSheet";
import ReactDataSheet from "react-datasheet";

export default class ImprovedSheet extends Component {
	url = urlParser(window.location.href, true);
	state = {
		data: generateData(this.url.query.x, this.url.query.y),
	};

	valueRenderer = (cell) => cell.value;
	onCellsChanged = (changes) => {
		const grid = this.state.data.map((row) => [...row]);
		changes.forEach(({ cell, row, col, value }) => {
			grid[row][col] = { ...grid[row][col], value };
		});
		this.setState({ data: grid });
	};

	render() {
		const Comp = this.url.query.new ? DataSheet : ReactDataSheet;
		const { data } = this.state;
		return (
			<div style={{ overflow: "auto", height: 500, width: 500 }}>
				<Comp data={data} valueRenderer={this.valueRenderer} onCellsChanged={this.onCellsChanged} />
			</div>
		);
	}
}
