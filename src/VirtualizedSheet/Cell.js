import React, { memo } from "react";
import PropTypes from "prop-types";
// import CellShape from "react-datasheet/lib/CellShape";

const Cell = memo(function Cell({
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
	children,
}) {
	// const { colSpan, rowSpan } = cell;
	const attributes = attributesRenderer ? attributesRenderer(cell, row, col) : {};

	return (
		<div
			className={className}
			onMouseDown={onMouseDown}
			onMouseOver={onMouseOver}
			onDoubleClick={onDoubleClick}
			onTouchEnd={onDoubleClick}
			onContextMenu={onContextMenu}
			// colSpan={colSpan}
			// rowSpan={rowSpan}
			{...attributes}
			style={style}>
			{children}
		</div>
	);
});

Cell.propTypes = {
	row: PropTypes.number.isRequired,
	col: PropTypes.number.isRequired,
	// cell: PropTypes.shape(CellShape).isRequired,
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

export default Cell;
