import React, { Component, createRef } from "react";
import "react-datasheet/lib/react-datasheet.css";
import "./ScrollSync.scss";
import { generateData } from "../utils";
import clsx from "clsx";
import urlParser from "url-parse";
import ReactDataSheet from "react-datasheet";
import { Scrollbar } from "react-scrollbars-custom";
import { AutoSizer } from "react-virtualized";

const valueRenderer = (cell) => cell.value;
export default class ScrollSync extends Component {
	url = urlParser(window.location.href, true);

	xAxisRef = createRef();
	yAxisRef = createRef();
	contentRef = createRef();

	scrollSrc = null;

	state = {
		grid: generateData(this.url.query.x, this.url.query.y),
	};

	handleContentScroll = ({ scrollTop, scrollLeft }) => {
		if (this.scrollSrc !== "content") {
			return;
		}
		this.xAxisRef.current.scrollLeft = scrollLeft;
		this.yAxisRef.current.scrollTop = scrollTop;
	};

	handleXAxisScroll = (e) => {
		if (this.scrollSrc !== "xaxis") {
			return;
		}
		const { scrollLeft } = e.currentTarget;
		this.contentRef.current.scrollLeft = scrollLeft;
	};

	handleYAxisScroll = (e) => {
		if (this.scrollSrc !== "yaxis") {
			return;
		}
		const { scrollTop } = e.currentTarget;
		this.contentRef.current.scrollTop = scrollTop;
	};

	onMouseEnterContent = (e) => {
		setTimeout(() => {
			this.scrollSrc = "content";
		}, 300);
	};

	onMouseEnterXAxis = () => {
		setTimeout(() => {
			this.scrollSrc = "xaxis";
		}, 300);
	};

	onMouseEnterYAxis = () => {
		setTimeout(() => {
			this.scrollSrc = "yaxis";
		}, 300);
	};

	onMouseLeave = () => {
		setTimeout(() => {
			this.scrollSrc = null;
		}, 300);
	};

	onCellsChanged = (changes) => {
		const grid = this.state.grid.map((row) => [...row]);
		changes.forEach(({ cell, row, col, value }) => {
			grid[row][col] = { ...grid[row][col], value };
		});
		this.setState({ grid });
	};

	render() {
		return (
			<div className="scrollsync-container">
				<div
					className="xaxis"
					ref={this.xAxisRef}
					onScroll={this.handleXAxisScroll}
					onMouseEnter={this.onMouseEnterXAxis}
					onMouseLeave={this.onMouseLeave}>
					<table>
						<tbody>
							<tr>
								{this.state.grid[0].map((cell, i) => (
									<td key={i} className={clsx("table-cell", i % 2 && "dark")}>
										C{i}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
				<div
					className="yaxis"
					ref={this.yAxisRef}
					onScroll={this.handleYAxisScroll}
					onMouseEnter={this.onMouseEnterYAxis}
					onMouseLeave={this.onMouseLeave}>
					<table>
						<tbody>
							{this.state.grid.map((cell, i) => (
								<tr key={i}>
									<td className={clsx("table-cell", i % 2 && "dark")}>R{i}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="content-wrapper">
							<Scrollbar
								className="adwdwd"
								ref={this.contentRef}
								disableTracksWidthCompensation
								onScroll={this.handleContentScroll}
								onMouseEnter={this.onMouseEnterContent}
								onMouseLeave={this.onMouseLeave}>
								<ReactDataSheet
									data={this.state.grid}
									valueRenderer={valueRenderer}
									onCellsChanged={this.onCellsChanged}
									keyFn={(row, column) => `${row}-${column}`}
								/>
							</Scrollbar>
				</div>
			</div>
		);
	}
}
