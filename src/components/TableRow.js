import React, { Component } from "react";
class TableRow extends React.Component {
    render() {
       return (
        <tr><td>{this.props.lookup.lookupDate}</td><td>{this.props.lookup.lookupLat}</td><td>{this.props.lookup.lookupLong}</td></tr>
       );
    }
 }
export default TableRow;