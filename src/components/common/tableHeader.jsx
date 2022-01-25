import React from "react";

class TableHeader extends React.Component {
  raiseSort = (path) => {
    const { sortColumn } = this.props;
    const order =
      sortColumn.path === path && sortColumn.order === "asc" ? "desc" : "asc";
    this.props.onSort({ path, order });
  };

  renderSortIcon = (column) => {
    const { path, order } = this.props.sortColumn;
    if (column.path !== path) return null;
    if (order === "asc") return <i className="fas fa-sort-up" />;
    return <i className="fas fa-sort-down" />;
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
