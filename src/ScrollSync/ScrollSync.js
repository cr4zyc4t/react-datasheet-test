import React, { useState, useCallback, useRef } from "react";
import "./ScrollSync.scss";
import { generateData } from "../utils";
import clsx from "clsx";
import urlParser from "url-parse";

export default function ScrollSync() {
	const url = urlParser(window.location.href, true);
	const { x = 20, y = 20 } = url.query;

	const [data] = useState(generateData(x, y));
	const xAxis = useRef(null);
	const yAxis = useRef(null);
	const contentRef = useRef(null);

	const handleContentScroll = useCallback((e) => {
		const { scrollTop, scrollLeft } = e.currentTarget;
		xAxis.current.scrollLeft = scrollLeft;
		yAxis.current.scrollTop = scrollTop;
	}, []);
	const handleXAxisScroll = useCallback((e) => {
		const { scrollLeft } = e.currentTarget;
		// contentRef.current.scrollLeft = scrollLeft;
	}, []);
	const handleYAxisScroll = useCallback((e) => {
		const { scrollTop } = e.currentTarget;
		// contentRef.current.scrollTop = scrollTop;
	}, []);

	return (
		<div className="scrollsync-container">
			<div className="xaxis" ref={xAxis} onScroll={handleXAxisScroll}>
				<table>
					<tbody>
						<tr>
							{data[0].map((cell, i) => (
								<td key={i} className={clsx("table-cell", i % 2 && "dark")}>
									C{i + 1}
								</td>
							))}
						</tr>
					</tbody>
				</table>
			</div>
			<div className="yaxis" ref={yAxis} onScroll={handleYAxisScroll}>
				<table>
					<tbody>
						{data.map((cell, i) => (
							<tr key={i}>
								<td className={clsx("table-cell", i % 2 && "dark")}>R{i + 1}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="content-wrapper" ref={contentRef} onScroll={handleContentScroll}>
				<table>
					<tbody>
						{data.map((row, i) => (
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
