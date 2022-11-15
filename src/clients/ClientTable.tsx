import { TableCell, TableSortLabel } from "@mui/material";
import React from "react";
import { Client } from "../api/base";
import GenericTable from "../components/GenericTable/GenericTable";
import BasicMenu from "../components/GenericUIComponents/BasicMenu";

interface ClientTableData {
    clientName: string
    companyName: string
    invoicesCount: number
    totalBilled: number
    id: string
}
interface HeadCell {

    id: keyof ClientTableData;
    label: string;

}
type Order = 'asc' | 'desc' | "no sort";

const headCells: readonly HeadCell[] = [
    {
        id: 'clientName',

        label: 'Name',
    },

    {
        id: 'companyName',

        label: 'Company Name',
    },
    {
        id: 'invoicesCount',

        label: 'Invoices',
    },
    {
        id: 'totalBilled',

        label: 'Total Billed',
    },

];


export const ClientsTable = (props: {
    clientsTableData: ClientTableData[], updateRoute: (property: string | {}) => unknown
    editQuery?: boolean
}) => {
    const [order, setOrder] = React.useState<Order>('no sort');
    const [orderBy, setOrderBy] = React.useState<keyof ClientTableData>('clientName');
    const onRowClickEvent = (event: React.MouseEvent<HTMLTableRowElement>, id: string) => {
        props.updateRoute(`/clients/${id}`)
    }
    const onAddInvoiceEvent = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {
        props.updateRoute(`/invoices/new`)
    }
    const onEditClientEvent = (event: React.MouseEvent<HTMLLIElement, MouseEvent>, id: string) => {
        props.updateRoute(`/clients/${id}/edit`)


    }
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ClientTableData,
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
        <GenericTable
            rowContent={props.clientsTableData}
            header={(<ClientsTableHeader order={order} orderBy={orderBy}
                onRequestSort={handleRequestSort}
                editQuery={props.editQuery} />)}
            onRowClickEvent={onRowClickEvent}
            renderRow={(client) => {
                return (

                    <React.Fragment
                    >
                        <TableCell component="th" scope="row" data-test="client-name" >
                            {client.clientName}</TableCell>

                        <TableCell align="right"
                            data-test="client-companyName"
                        >{client.companyName}</TableCell>
                        <TableCell data-test="client-totalBilled" align="right">
                            {client.totalBilled}</TableCell>
                        <TableCell data-test="client-invoicesCount" align="right">
                            {client.invoicesCount}</TableCell>


                        <TableCell data-test="client-actions" align="right" onClick={(e) => {
                            e.stopPropagation();
                            console.log("click within table cell")
                        }} >
                            <BasicMenu
                                menu={[{ name: "Add new invoice", Event: onAddInvoiceEvent, dataTest: "invoice-add" },
                                { name: "Edit client", Event: onEditClientEvent, dataTest: "client-add" }]}

                            />
                        </TableCell>
                    </React.Fragment >

                )
            }}
        />
    )
}

export const ClientsTableHeader = (props: {
    order: Order, orderBy: string, onRequestSort: (event: React.MouseEvent<unknown>,
        property: keyof ClientTableData,) => unknown, editQuery?: boolean
}) => {
    const { order, orderBy, onRequestSort } =
        props
    const createSortHandler =
        (property: keyof ClientTableData) => (event: React.MouseEvent<unknown>) => {
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
                    {props.editQuery === true || props.editQuery === undefined ?
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



// `/${props.type}/${row.id}/view`
// /clients/${client.id}