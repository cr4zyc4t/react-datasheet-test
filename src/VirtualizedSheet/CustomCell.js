import React, { memo } from "react";
import DataCell from "./DataCell";

export default memo(function CustomCell({ columnIndex: j, rowIndex: i, style }) {
	const { forceEdit } = this.state;
	const isEditing = this.isEditing(i, j);
	const {
		// sheetRenderer: SheetRenderer,
		// rowRenderer: RowRenderer,
		cellRenderer,
		dataRenderer,
		valueRenderer,
		dataEditor,
		valueViewer,
		attributesRenderer,
		// className,
		// overflow,
		data,
		// keyFn,
	} = this.props;

	const cell = data[i][j];
	return (
		<div style={style}>
			<DataCell
				key={`${i}-${j}`}
				row={i}
				col={j}
				cell={cell}
				forceEdit={forceEdit}
				onMouseDown={this.onMouseDown}
				onMouseOver={this.onMouseOver}
				onDoubleClick={this.onDoubleClick}
				onContextMenu={this.onContextMenu}
				onChange={this.onChange}
				onRevert={this.onRevert}
				onNavigate={this.handleKeyboardCellMovement}
				onKey={this.handleKey}
				selected={this.isSelected(i, j)}
				editing={isEditing}
				clearing={this.isClearing(i, j)}
				attributesRenderer={attributesRenderer}
				cellRenderer={cellRenderer}
				valueRenderer={valueRenderer}
				dataRenderer={dataRenderer}
				valueViewer={valueViewer}
				dataEditor={dataEditor}
				editValue={this.state.editValue}
				{...(isEditing
					? {
							onEdit: this.handleEdit,
					  }
					: {})}
			/>
		</div>
	);
});
