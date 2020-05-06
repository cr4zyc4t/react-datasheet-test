import React, { Component, createRef } from "react";
import "react-datasheet/lib/react-datasheet.css";
import "./ScrollSync.scss";
import { generateData } from "../utils";
import clsx from "clsx";
import urlParser from "url-parse";
import ReactDataSheet from "react-datasheet";
import { Scrollbar } from "react-scrollbars-custom";

const valueRenderer = (cell) => cell.value;
export default class ScrollSync extends Component {
	url = urlParser(window.location.href, true);

	xAxisRef = createRef();
	yAxisRef = createRef();
	contentRef = createRef();

	masterScroller = null;

	state = {
		grid: generateData(this.url.query.x, this.url.query.y),
	};

	onScrollStart = (scroller) => () => {
		if (!this.masterScroller) {
			this.masterScroller = scroller;
		}
	};

	onScroll = (scroller) => ({ scrollTop, scrollLeft }) => {
		if (this.masterScroller !== scroller) {
			return;
		}
		this.masterScroller !== this.contentRef && (this.contentRef.current.scrollLeft = scrollLeft);
		this.masterScroller !== this.contentRef && (this.contentRef.current.scrollTop = scrollTop);
		this.masterScroller !== this.xAxisRef && (this.xAxisRef.current.scrollLeft = scrollLeft);
		this.masterScroller !== this.yAxisRef && (this.yAxisRef.current.scrollTop = scrollTop);
	};

	onScrollStop = (scroller) => () => {
		if (this.masterScroller === scroller) {
			this.masterScroller = null;
		}
	};

	// handleContentScroll = ({ scrollTop, scrollLeft }) => {
	// 	if (this.masterScroller !== "content") {
	// 		return;
	// 	}
	// 	this.xAxisRef.current.scrollLeft = scrollLeft;
	// 	this.yAxisRef.current.scrollTop = scrollTop;
	// };

	// handleXAxisScroll = ({ scrollTop, scrollLeft }) => {
	// 	if (this.masterScroller !== "xaxis") {
	// 		return;
	// 	}
	// 	this.contentRef.current.scrollLeft = scrollLeft;
	// };

	// handleYAxisScroll = ({ scrollTop, scrollLeft }) => {
	// 	if (this.masterScroller !== "yaxis") {
	// 		return;
	// 	}
	// 	this.contentRef.current.scrollTop = scrollTop;
	// };

	// onMouseEnterContent = (e) => {
	// 	// setTimeout(() => {
	// 	this.masterScroller = "content";
	// 	// }, 300);
	// };

	// onMouseEnterXAxis = () => {
	// 	// setTimeout(() => {
	// 	this.masterScroller = "xaxis";
	// 	// }, 300);
	// };

	// onMouseEnterYAxis = () => {
	// 	// setTimeout(() => {
	// 	this.masterScroller = "yaxis";
	// 	// }, 300);
	// };

	// onMouseLeave = () => {
	// 	// setTimeout(() => {
	// 	this.masterScroller = null;
	// 	// }, 300);
	// };

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
				<Scrollbar
					className="xaxis"
					ref={this.xAxisRef}
					disableTracksWidthCompensation
					onScroll={this.onScroll(this.xAxisRef)}
					onScrollStart={this.onScrollStart(this.xAxisRef)}
					onScrollStop={this.onScrollStop(this.xAxisRef)}>
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
				</Scrollbar>
				<Scrollbar
					className="yaxis"
					ref={this.yAxisRef}
					disableTracksWidthCompensation
					onScroll={this.onScroll(this.yAxisRef)}
					onScrollStart={this.onScrollStart(this.yAxisRef)}
					onScrollStop={this.onScrollStop(this.yAxisRef)}>
					<table>
						<tbody>
							{this.state.grid.map((cell, i) => (
								<tr key={i}>
									<td className={clsx("table-cell", i % 2 && "dark")}>R{i}</td>
								</tr>
							))}
						</tbody>
					</table>
				</Scrollbar>
				<div className="content-wrapper">
					<Scrollbar
						className="scrollbar-custom"
						ref={this.contentRef}
						disableTracksWidthCompensation
						onScroll={this.onScroll(this.contentRef)}
						onScrollStart={this.onScrollStart(this.contentRef)}
						onScrollStop={this.onScrollStop(this.contentRef)}>
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
