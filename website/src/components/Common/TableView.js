import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';

class TableView extends Component {
    render() {
        const { rows, columns } = this.props;
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns ?
                                columns.map((col, i) => {
                                    console.log("Column: ", col, i);
                                    return <TableCell key={i}>{col.label}</TableCell>
                                })
                                : null}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows ?
                            rows.map((row, i) => {
                                console.log("there is a row");
                                return columns.map((col, colIndex) => {
                                    return (
                                        <TableCell key={i}>
                                            {row[col.name]}
                                        </TableCell>
                                    )
                                })
                            })
                            : null}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}


export default TableView;