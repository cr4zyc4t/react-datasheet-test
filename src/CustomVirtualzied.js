import React, { PureComponent } from "react";
import { Grid } from "react-virtualized";
import clsx from "clsx";

export default class CustomVirtualized extends PureComponent {
	state = {
		start: {},
		end: {},
		selecting: false,
		forceEdit: false,
		editing: {},
		clear: {},
	};

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.pageClick);
		document.removeEventListener("mouseup", this.onMouseUp);
		document.removeEventListener("cut", this.handleCut);
		document.removeEventListener("copy", this.handleCopy);
		document.removeEventListener("paste", this.handlePaste);
	}

	handleKeydown = (e) => {
		if (e.isPropagationStopped && e.isPropagationStopped()) {
			return;
		}

		if (e.shiftKey) {
			let endX = this.state.end.x;
			let endY = this.state.end.y;
			console.log(`Log: CustomVirtualized -> handleKeydown -> this.state.end`, endX, typeof endY);
			switch (e.keyCode) {
				case 37:
					endX--;
					break;
				case 38:
					endY--;
					break;
				case 39:
					endX++;
					break;
				case 40:
					endY++;
					break;

				default:
					return;
			}
			this.setState({
				end: {
					x: endX,
					y: endY,
				},
			});
		}
	};

	handleMouseDown = (x, y) => {
		this.setState({
			selecting: true,
			start: { x, y },
			end: {},
		});
		document.addEventListener("mouseup", this.handleMouseUp);
	};

	handleMouseOver = (x, y) => {
		if (this.state.selecting) {
			this.setState({
				end: { x, y },
			});
		}
	};

	handleMouseUp = () => {
		this.setState((state) => {
			if (state.end.x === undefined && state.end.y === undefined) {
				return {
					selecting: false,
					end: state.start,
				};
			}
			return {
				selecting: false,
			};
		});
		document.removeEventListener("mouseup", this.handleMouseUp);
	};

	isSelected = (x, y) => {
		const { start, end } = this.state;
		const posX = x >= start.x && x <= end.x;
		const negX = x <= start.x && x >= end.x;
		const posY = y >= start.y && y <= end.y;
		const negY = y <= start.y && y >= end.y;

		return (posX && posY) || (negX && posY) || (negX && negY) || (posX && negY);
	};

	cellRenderer = ({ columnIndex: x, key, rowIndex: y, style }) => {
		return (
			<div
				onMouseDown={() => this.handleMouseDown(x, y)}
				onMouseOver={() => this.handleMouseOver(x, y)}
				key={key}
				style={style}
				className={clsx("cell", {
					dark: x % 2 === y % 2,
					selected: this.isSelected(x, y),
				})}>
				r:{y},c:{x}
			</div>
		);
	};

	render() {
		return (
			<div tabIndex={0} onKeyDown={this.handleKeydown} className="grid-container">
				<Grid
					height={500}
					width={600}
					columnCount={1500}
					columnWidth={60}
					rowCount={1000}
					rowHeight={34}
					cellRenderer={({ columnIndex: x, key, rowIndex: y, style }) => {
						return (
							<div
								onMouseDown={() => this.handleMouseDown(x, y)}
								onMouseOver={() => this.handleMouseOver(x, y)}
								key={key}
								style={style}
								className={clsx("cell", {
									dark: x % 2 === y % 2,
									selected: this.isSelected(x, y),
								})}>
								r:{y},c:{x}
							</div>
						);
					}}
				/>
			</div>
		);
	}
}
