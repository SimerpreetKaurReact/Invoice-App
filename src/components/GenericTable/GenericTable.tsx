import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import * as React from 'react';

import styled from "@emotion/styled"


interface GenericTableProps<T extends Record<string, any>> {
    renderRow: (invoice: T) => React.ReactElement;
    header: React.ReactElement;
    rowContent: T[]
    type?: string
    onRowClickEvent: (event: React.MouseEvent<HTMLTableRowElement>, id: string) => void
}
const StyledTableRow = styled(TableRow)({ '&:last-child td, &:last-child th': { border: 0 } }
)
const GenericTable = <T extends Record<string, any>>(props: GenericTableProps<T>) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {props.header}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.rowContent.map((row) => (

                        <StyledTableRow
                            key={row.id}
                            id={row.id}
                            hover={true}
                            data-test={`${props.type}-row-${row.id}`}
                            onClick={(e) => props.onRowClickEvent(e, row.id)}

                        >

                            {props.renderRow(row)}

                        </StyledTableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
export default GenericTable