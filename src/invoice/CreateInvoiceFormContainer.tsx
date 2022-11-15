import React, { useEffect, useState } from 'react'
import { InvoiceApi } from '../api/invoice'
import useAsync, { AsyncStateEnum } from '../hooks/useAsync'
import CreateInvoiceForm, { CreateInvoice } from './CreateInvoiceForm'
import { useSnackbar } from 'notistack';
import SkeltonLoadingList from "../components/SkeltonLoadingList"
import { fetchClients, Client } from "../api/base"

export interface responseObject {

    user_id: string;
    invoice_number: string;
    client_id: string;
    date: number;
    dueDate: number;
    projectCode: string;
    meta: {
        items: {
            description: string;
            price: number;
        }[];
    };
    value: number;
    createdAt: number;
    id: string;
}



function CreateInvoiceFormContainer(props: { invoiceId?: string, button?: string }) {
    const { enqueueSnackbar } = useSnackbar();
    const [invoiceApiRespone, setInvoiceApiResponse] = useState(null)
    const [defaultDetails, setDefaultDetails] = useState<CreateInvoice>({
        invoiceNumber: "",
        client: "",
        date: Date.now(),
        dueDate: Date.now(),
        projectCode: ""

    })

    const { status, data, error, execute } = useAsync(props.invoiceId ? InvoiceApi.updateInvoice : InvoiceApi.createInvoice)
    const { status: statusGetInvoice, data: dataGetInvoice, error: errorGetInvoice, execute: executeGetInvoice } = useAsync(InvoiceApi.getInvoiceById)
    const { status: statusGetClient, data: dataGetClient, error: errorGetClient, execute: executeGetClient } = useAsync(fetchClients)

    // const { persistCreateinvoice, AuthError } = useCreateinvoiceAuthContext()
    // if (status === AsyncStateEnum.PENDING) {
    //     return <SkeltonLoadingList />
    // }


    useEffect(() => {
        console.log("execute get invoice response")
        executeGetClient(undefined).then((res) => {
            executeGetInvoice({ invoiceId: props.invoiceId })
                .then(invoiceRes => {

                    setInvoiceApiResponse(invoiceRes)
                    const clientName = res?.clients.findIndex((client) =>
                        invoiceRes.client_id === client.id
                    )
                    setDefaultDetails({

                        invoiceNumber: invoiceRes.invoice_number,
                        client: clientName.toString(),
                        date: new Date(invoiceRes.date),
                        dueDate: new Date(invoiceRes.dueDate),
                        projectCode: invoiceRes.projectCode,
                        items: invoiceRes.meta.items,
                        id: invoiceRes.id
                    })


                }).catch((err) => { console.log(err) })
        }).catch((err) => { console.log(err) })




    }, [])
    const formDetails = React.useMemo(() => {

        return {
            invoiceNumber: defaultDetails.invoiceNumber,
            client: defaultDetails.client,
            date: defaultDetails.date,
            dueDate: defaultDetails.dueDate,
            projectCode: defaultDetails.projectCode,
            items: defaultDetails.items,
            id: defaultDetails.id
        }
    }, [defaultDetails])

    if (error) {
        enqueueSnackbar(`invoice created error: ${error}`, { variant: "error" })
    }
    if (!invoiceApiRespone || statusGetInvoice === AsyncStateEnum.PENDING || statusGetClient == AsyncStateEnum.PENDING) {
        //loading state here
        console.log(statusGetInvoice, statusGetClient, "statusGetInvoice")
        return <SkeltonLoadingList data-test="loading-overlay" />
    }
    if (statusGetInvoice === AsyncStateEnum.ERROR) {
        //loading state here
        console.log(statusGetInvoice, statusGetClient, "within error state", errorGetInvoice)
        enqueueSnackbar(`no invoice found with this id`, { variant: "error" })
        return <p>Invoice Not found </p>
    }


    return (
        <>

            {/* {error === "Error: 500" && "Something went wrong, please try again"}
            {console.log(error)}
            {error === "Error: 400" && "Invalid Credentials"} */}

            <CreateInvoiceForm
                disabled={status === AsyncStateEnum.PENDING}
                disableItems={props.invoiceId && props.button === "View" ? true : false}
                defaultDetails={formDetails}
                error={error ? error : null}

                selectBoxDetails={dataGetClient?.clients || []}
                type={props.button}
                onCreateinvoiceRequest={async (values) => {
                    console.log(values.items, values, "values.items")
                    const formDetails = {
                        invoice_number: values.invoiceNumber,
                        client_id: dataGetClient?.clients[Number(values.client)].id,
                        date: values.date,
                        dueDate: values.dueDate,
                        projectCode: values.projectCode,

                        meta: {
                            items: values.items
                        },
                        value: values.items?.reduce((a, e) => a + e.price, 0) || 0
                    }
                    //set some flag to loading

                    const result = await execute({ ...formDetails, id: props.invoiceId })

                    if (result) {
                        enqueueSnackbar(`invoice ${props.button === "Edit" ? "updated" : "created"} successfully`, { variant: "success" })
                    }
                }

                } />
        </>
    )
}

export default CreateInvoiceFormContainer
