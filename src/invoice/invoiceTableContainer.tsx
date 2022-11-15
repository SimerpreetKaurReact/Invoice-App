import { useState, useEffect } from "react"
import { InvoiceGroup } from "../../pages/invoices"
import { fetchInvoices, InvoiceDTO } from "../api/base"
import SkeltonLoadingList from "../components/SkeltonLoadingList"
import GenericTableHeader from "../components/GenericTable/GenericTableHeader"
import * as React from 'react';
import { Typography, TextField } from "@mui/material";
import GenericTable from "../components/GenericTable/GenericTable";
import InvoiceTable from "./InvoiceTable";
import Autocomplete from '@mui/material/Autocomplete';

//keep all the api information in the container 

export const InvoiceTableContainter = (props: {
    page?: number,
    sortBy?: string
    sortOrder?: string
    limit?: number
    clientId?: string
    renderFooter?: (invoiceApiResponse: InvoiceGroup) => React.ReactElement
    renderFiltering?: (invoiceApiResponse: InvoiceGroup) => React.ReactElement
    onPageChangeRequest?: (newPage: number) => unknown
    updateRoute: (property: string | {}) => unknown
    editQuery?: boolean
}) => {

    const [invoicesApiResponse, setInvoicesApiResponse] = useState<null | InvoiceGroup>(null)
    const [uniqueClients, setUniqueClients] = useState<{ id: string, name: string }[]>([])

    useEffect(() => {

        const queryParams: {
            page: number,
            sortBy?: string
            sort?: string
            limit?: number
            clientId?: string
        } = { page: props.page ?? 1, limit: props.limit }
        //read page from current route
        if (props.sortBy && props.sortBy?.length > 0) {
            queryParams.sortBy = props.sortBy
        }
        if (props.sortOrder && props.sortOrder?.length > 0) {
            queryParams.sort = props.sortOrder
        }
        if (props.clientId && props.clientId?.length > 0) {
            queryParams.clientId = props.clientId
        }
        console.log(props.clientId, queryParams)
        fetchInvoices(queryParams)
            .then(res => {
                console.log(res, props.page ?? 1)
                setInvoicesApiResponse(res)

            })
            .catch((err) => { console.log(err) })
    }, [props.page, props.sortBy, props.sortOrder, props.clientId])


    //we are using useMemo since we are returning a memoized function
    //use useCallback to return a memoized function
    const invoiceTableData = React.useMemo(() => {
        return invoicesApiResponse?.invoices.map(item => {
            const { invoice, client } = item



            return {
                id: invoice.id,
                invoiceNumber: invoice.invoice_number,
                dueDate: invoice.dueDate,
                companyName: client.companyDetails.name,
                total: invoice.value,
                creationDate: invoice.date
            }
        }) ?? []
    }, [invoicesApiResponse])

    if (!invoicesApiResponse) {
        //loading state here
        return <SkeltonLoadingList data-test="loading-overlay" />
    }
    if (invoicesApiResponse.total === 0) {
        //loading state here
        return <Typography variant="h4" data-test="empty-placeholder"
        >
            No invoices added
        </Typography>
    }
    return (<div>
        {/* <button onClick={() => {
            props.onPageChangeRequest((props.page ?? 1) - 1)
        }}>PREV</button>
        <button onClick={() => {
            props.onPageChangeRequest((props.page ?? 1) + 1)
        }}>NEXT</button> */}
        {/* <pre>{JSON.stringify(invoicesApiResponse, null, 4)}</pre> */}
        <GenericTableHeader
            header="Latest invoices"
            buttonFor="Invoices"

        />
        <InvoiceTable invoiceTableData={invoiceTableData} updateRoute={props.updateRoute} editQuery={props.editQuery}
        />




        {props.renderFooter?.(invoicesApiResponse)}
        {props.renderFiltering?.(invoicesApiResponse)}
    </div>)
}
interface InvoiceData {
    invoiceNumber: string;
    date: number;
    dueDate: number;
    companyDetailsName: string;
    id: string;
    value: number
}

//Note:page not 0 or -ve and greater than total, then reset to 1
//add loading states, error handling here

export const Filtering = (props: {
    apiResponse: InvoiceGroup,
    onChange: (event: React.SyntheticEvent<Element, Event>, clientId: string | undefined) => unknown
}
) => {
    const { apiResponse: res, onChange } = props
    const [value, setValue] = React.useState<{
        id: string;
        name: string;
    } | null>(null);
    const [inputValue, setInputValue] = React.useState('');
    const clientNames = res.invoices.map((invoice) => ({ name: invoice.client.companyDetails.name, id: invoice.invoice.client_id }))
    const uniqueClients = clientNames.filter((e, i) => clientNames.findIndex(a => a["id"] === e["id"]) === i)
    return (
        <>

            <Autocomplete
                disablePortal
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    props.onChange(event, newValue?.id)
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={uniqueClients}
                getOptionLabel={(option) => option.name}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Filter Clients" />}
            />
        </>
    )
}