import { TableSortLabel, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import * as React from 'react';

import styled from "@emotion/styled"
import GenericTable from '../components/GenericTable/GenericTable';
import BasicMenu from "../components/GenericUIComponents/BasicMenu"


interface InvoiceData {
    invoiceNumber: string;
    creationDate: number;
    dueDate: number;
    companyName: string;

    id: string;
    total: number
}
interface HeadCell {

    id: keyof InvoiceData;
    label: string;

}
const headCells: readonly HeadCell[] = [
    {
        id: 'companyName',

        label: 'Company Name',
    },

    {
        id: 'invoiceNumber',

        label: 'Invoice Number',
    },
    {
        id: 'creationDate',

        label: 'Creation Date',
    },
    {
        id: 'dueDate',

        label: 'Due Date',
    },
    {
        id: 'total',

        label: 'Amount',
    },
];
const formatInvoiceDate = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}
//creation,date,dueDate,companyName,price
type Order = 'asc' | 'desc' | "no sort";

export const InvoiceTableHeader = (props: {
    order: Order, orderBy: string, onRequestSort: (event: React.MouseEvent<unknown>,
        property: keyof InvoiceData,) => unknown, editQuery?: boolean
}) => {
    const { order, orderBy, onRequestSort } =
        props
    const createSortHandler =
        (property: keyof InvoiceData) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <>
            {headCells.map((headCell) => (
                //no sort for invoice number
                <TableCell key={headCell.id}
                    align="right"
                    data-test={headCell.id.split(/(?=[A-Z])/).join("-").toLowerCase()}
                >
                    {headCell.id != "invoiceNumber" && props.editQuery === true || props.editQuery === undefined ?
                        <TableSortLabel
                            active={orderBy === headCell.id && order !== "no sort"}
                            direction={orderBy === headCell.id && order !== "no sort" ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                        : headCell.label}
                </TableCell>


            ))}
            <TableCell align="right"></TableCell>
        </>)
}


const InvoiceTable = (props: {
    invoiceTableData: InvoiceData[],
    updateRoute: (property: string | {}) => unknown
    editQuery?: boolean
}) => {
    const [order, setOrder] = React.useState<Order>('no sort');
    const [orderBy, setOrderBy] = React.useState<keyof InvoiceData>('creationDate');

    const onRowClickEvent = (event: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        props.updateRoute(`/invoices/${id}/view`)

    }
    const onPrintInvoiceEvent = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {

        props.updateRoute(`/invoices/${id}/view`)

    }
    const onEditInvoiceEvent = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {
        props.updateRoute(`/invoices/${id}/edit`)

    }
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof InvoiceData,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : order === "desc" ? 'no sort' : "asc");
        setOrderBy(property);
        console.log(order, orderBy)
        const sortBy = property
        const sortOrder = isAsc ? 'desc' : order === "desc" ? 'no sort' : "asc"
        if (sortOrder === "no sort") {
            props.updateRoute({})
        } else {
            props.updateRoute({ sortBy, sortOrder })
        }


    };

    return (
        <GenericTable rowContent={props.invoiceTableData}
            type="invoice"
            header={(<InvoiceTableHeader order={order} orderBy={orderBy}
                onRequestSort={handleRequestSort}
                editQuery={props.editQuery}
            />)}
            onRowClickEvent={onRowClickEvent}
            renderRow={(invoice) => {
                return (
                    <React.Fragment >
                        <TableCell component="th" data-test="invoice-company’" scope="row">
                            {invoice.companyName}</TableCell>
                        <TableCell data-test="invoice-number"
                            align="right">{invoice.invoiceNumber}</TableCell>
                        <TableCell data-test="invoice-number"
                            align="right">{formatInvoiceDate(invoice.creationDate)}</TableCell>


                        <TableCell data-test="invoice-number" align="right">
                            {formatInvoiceDate(invoice.dueDate)}</TableCell>

                        <TableCell data-test="invoice-price" align="right">
                            {invoice.total}</TableCell>
                        <TableCell data-test="invoice-actions’" align="right" onClick={(e) => {
                            e.stopPropagation();
                            console.log("click within table cell", e.target)
                        }} >
                            <BasicMenu
                                menu={[{ name: "Print invoice", id: invoice.id, dataTest: "invoice-print", Event: onPrintInvoiceEvent },
                                { name: "Edit invoice", dataTest: "invoice-actions", id: invoice.id, Event: onEditInvoiceEvent }]}
                            /></TableCell>
                    </React.Fragment>)
            }}
        />
    );
}
export default InvoiceTable