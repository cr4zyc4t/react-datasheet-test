import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import CellShape from "react-datasheet/lib/CellShape";
import clsx from "clsx";

export default class Cell extends PureComponent {
	render() {
		const {
			cell,
			row,
			col,
			attributesRenderer,
			className,
			style,
			onMouseDown,
			onMouseOver,
			onDoubleClick,
			onContextMenu,
		} = this.props;

		// const { colSpan, rowSpan } = cell;
		const attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {};

		return (
			<span
				className={clsx(className, { dark: row % 2 === col % 2 })}
				onMouseDown={onMouseDown}
				onMouseOver={onMouseOver}
				onDoubleClick={onDoubleClick}
				onTouchEnd={onDoubleClick}
				onContextMenu={onContextMenu}
				// colSpan={colSpan}
				// rowSpan={rowSpan}
				style={style}
				{...attributes}>
				{this.props.children}
			</span>
		);
	}
}

Cell.propTypes = {
	row: PropTypes.number.isRequired,
	col: PropTypes.number.isRequired,
	cell: PropTypes.shape(CellShape).isRequired,
	selected: PropTypes.bool,
	editing: PropTypes.bool,
	updated: PropTypes.bool,
	attributesRenderer: PropTypes.func,
	onMouseDown: PropTypes.func.isRequired,
	onMouseOver: PropTypes.func.isRequired,
	onDoubleClick: PropTypes.func.isRequired,
	onContextMenu: PropTypes.func.isRequired,
	className: PropTypes.string,
	style: PropTypes.object,
};

Cell.defaultProps = {
	selected: false,
	editing: false,
	updated: false,
	attributesRenderer: () => {},
};
