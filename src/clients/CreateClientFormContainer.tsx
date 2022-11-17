import React, { useEffect, useState } from 'react'
import { ClientApi } from '../api/client'
import useAsync, { AsyncStateEnum } from '../hooks/useAsync'
import CreateClientForm, { CreateClient } from './CreateClientForm'
import { useSnackbar } from 'notistack';
import SkeltonLoadingList from "../components/SkeltonLoadingList"
export interface responseObject {
    user_id: string;
    name: string;
    email: string;
    companyDetails: {
        name: string;
        vatNumber: string;
        regNumber: string;
        address: string;
        iban: string;
        swift: string;
    };
    createdAt: number;
    id: string;
}
function CreateClientFormContainer(props: { clientId?: string }) {
    const { enqueueSnackbar } = useSnackbar();
    const [resetForm, setResetForm] = useState(false)
    const [defaultDetails, setDefaultDetails] = useState<CreateClient>({
        name: "",
        email: "",
        companyDetails: {
            name: "",
            vatNumber: "",
            regNumber: "",
            address: "",
            iban: "",
            swift: ""
        }
    })

    const { status, data, error, execute } = useAsync(props.clientId ? ClientApi.updateClient : ClientApi.createClient)
    const { status: statusGetClient, data: dataGetClient, error: errorGetClient, execute: executeGetClient } = useAsync(ClientApi.getClientById)

    // const { persistCreateClient, AuthError } = useCreateClientAuthContext()
    // if (status === AsyncStateEnum.PENDING) {
    //     return <SkeltonLoadingList />
    // }

    useEffect(() => {
        if (props.clientId) {
            executeGetClient({ clientId: props.clientId })
                .then((res: responseObject) => {

                    setDefaultDetails({
                        name: res?.name || "",
                        email: res?.email || "",
                        companyDetails: res?.companyDetails || {
                            name: "",
                            vatNumber: "",
                            regNumber: "",
                            address: "",
                            iban: "",
                            swift: ""
                        }
                    })
                    console.log(res)
                }).catch((err) => { console.log(err) })

        }
    }, [props.clientId])

    useEffect(() => {
        if (error && props.clientId) {
            enqueueSnackbar(`Client updated error `, { variant: "error" })
        }

        if (error && !props.clientId) {
            enqueueSnackbar(`Client created error: ${error}`, { variant: "error" })
        }
    }, [error])
    if (statusGetClient === AsyncStateEnum.PENDING) {
        //loading state here
        return <SkeltonLoadingList data-test="loading-overlay" />
    }


    return (
        <>

            {/* {error === "Error: 500" && "Something went wrong, please try again"}
            {console.log(error)}
            {error === "Error: 400" && "Invalid Credentials"} */}

            <CreateClientForm
                disabled={status === AsyncStateEnum.PENDING}
                defaultDetails={defaultDetails}
                resetForm={resetForm}
                error={error}
                onCreateClientRequest={async (values) => {
                    setResetForm(false)
                    const formdetails = {
                        name: values.name,
                        email: values.email,
                        companyDetails: {
                            name: values.companyName,
                            vatNumber: values.VAT,
                            regNumber: values.registryNumber,
                            address: values.companyAddress,
                            iban: values.IBAN,
                            swift: values.SWIFT
                        }
                    }
                    //set some flag to loading
                    console.log('onCreateClientRequest', formdetails)
                    const result = await execute({ ...formdetails, id: props.clientId })
                    console.log("CreateClient result", result, data)
                    console.log(error)
                    if (result && props.clientId) {
                        enqueueSnackbar(`Client updated successfully`, { variant: "success" })
                    }

                    if (result && !props.clientId) {
                        setResetForm(true)
                        enqueueSnackbar(`Client created successfully`, { variant: "success" })
                    }


                }

                } />
        </>
    )
}

export default CreateClientFormContainer
