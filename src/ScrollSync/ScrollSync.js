import React, { Component, createRef } from "react";
import "./ScrollSync.scss";
import { generateData } from "../utils";
import clsx from "clsx";
import urlParser from "url-parse";

export default class ScrollSync extends Component {
	url = urlParser(window.location.href, true);

	data = generateData(this.url.query.x, this.url.query.y);
	xAxisRef = createRef();
	yAxisRef = createRef();
	contentRef = createRef();

	handleContentScroll = (e) => {
		const { scrollTop, scrollLeft } = e.currentTarget;
		this.xAxisRef.current.scrollLeft = scrollLeft;
		this.yAxisRef.current.scrollTop = scrollTop;
	};

	handleXAxisScroll = (e) => {
		const { scrollLeft } = e.currentTarget;
		this.contentRef.current.scrollLeft = scrollLeft;
	};

	handleYAxisScroll = (e) => {
		const { scrollTop } = e.currentTarget;
		this.contentRef.current.scrollTop = scrollTop;
	};

	onMouseEnterContent = (e) => {
		this.contentRef.current.addEventListener("scroll", this.handleContentScroll);
	};

	onMouseLeaveContent = () => {
		this.contentRef.current.removeEventListener("scroll", this.handleContentScroll);
	};

	onMouseEnterXAxis = () => {
		this.xAxisRef.current.addEventListener("scroll", this.handleXAxisScroll);
	};

	onMouseLeaveXAxis = () => {
		this.xAxisRef.current.removeEventListener("scroll", this.handleXAxisScroll);
	};

	onMouseEnterYAxis = () => {
		this.yAxisRef.current.addEventListener("scroll", this.handleYAxisScroll);
	};

	onMouseLeaveYAxis = () => {
		this.yAxisRef.current.removeEventListener("scroll", this.handleYAxisScroll);
	};

	render() {
		return (
			<div className="scrollsync-container">
				<div
					className="xaxis"
					ref={this.xAxisRef}
					onMouseEnter={this.onMouseEnterXAxis}
					onMouseLeave={this.onMouseLeaveXAxis}>
					<table>
						<tbody>
							<tr>
								{this.data[0].map((cell, i) => (
									<td key={i} className={clsx("table-cell", i % 2 && "dark")}>
										C{i + 1}
									</td>
								))}
							</tr>
						</tbody>
					</table>
				</div>
				<div
					className="yaxis"
					ref={this.yAxisRef}
					onMouseEnter={this.onMouseEnterYAxis}
					onMouseLeave={this.onMouseLeaveYAxis}>
					<table>
						<tbody>
							{this.data.map((cell, i) => (
								<tr key={i}>
									<td className={clsx("table-cell", i % 2 && "dark")}>R{i + 1}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div
					className="content-wrapper"
					ref={this.contentRef}
					onMouseEnter={this.onMouseEnterContent}
					onMouseLeave={this.onMouseLeaveContent}>
					<table>
						<tbody>
							{this.data.map((row, i) => (
								<tr key={i}>
									{row.map((cell, j) => (
										<td key={j} className={clsx("table-cell", i % 2 === j % 2 && "dark")}>
											{cell.value}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
