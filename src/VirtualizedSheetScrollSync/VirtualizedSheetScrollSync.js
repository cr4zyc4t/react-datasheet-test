import React, { Component, createRef } from "react";
import "./VirtualizedSheetScrollSync.scss";
import { generateData } from "../utils";
import urlParser from "url-parse";
import "react-datasheet/lib/react-datasheet.css";
import { AutoSizer } from "react-virtualized";
import Sheet from "./Sheet";

export default class VirtualizedSheetScrollSync extends Component {
	url = urlParser(window.location.href, true);

	sheet1Ref = createRef();
	sheet2Ref = createRef();

	state = {
		grid: generateData(this.url.query.x, this.url.query.y),
	};

	onSheet1Scroll = ({ scrollTop }) => {
		this.sheet2Ref.current.scrollToPosition({ scrollTop });
	};
	onSheet2Scroll = ({ scrollTop }) => {
		this.sheet1Ref.current.scrollToPosition({ scrollTop });
	};

	render() {
		const { grid } = this.state;
		return (
			<div className="virtualize-scroll-sync">
				<div className="scroll-area">
					<div className="sheet-container">
						<AutoSizer>
							{({ height, width }) => (
								<Sheet
									height={height}
									width={width}
									data={grid}
									ref={this.sheet1Ref}
									onScroll={this.onSheet1Scroll}
								/>
							)}
						</AutoSizer>
					</div>
				</div>
				<div className="scroll-area">
					<div className="sheet-container">
						<AutoSizer>
							{({ height, width }) => (
								<Sheet
									height={height}
									width={width}
									data={grid}
									ref={this.sheet2Ref}
									onScroll={this.onSheet2Scroll}
								/>
							)}
						</AutoSizer>
					</div>
				</div>
			</div>
		);
	}
}
