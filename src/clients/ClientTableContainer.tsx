import React from "react"
import { useRef, useEffect } from "react"
import { useClientListingStore } from "../../pages/clients"
import GenericTableHeader from "../components/GenericTable/GenericTableHeader"
import SkeltonLoadingList from "../components/SkeltonLoadingList"
import { ClientsTable } from "./ClientTable"

export const ClientsTableContainer = (props: {
    page?: number,
    sortBy?: string
    sort?: string
    limit?: number
    renderFooter?: (total: number) => React.ReactElement
    editQuery?: boolean
    updateRoute: (property: string | {}) => unknown
}) => {
    const fetchClients = useClientListingStore(state => state.fetchClients)
    const clients = useClientListingStore(state => state.clients)
    const total = useClientListingStore(state => state.total)
    const fetchClientsRef = useRef(fetchClients)
    fetchClientsRef.current = fetchClients

    useEffect(() => {
        const queryParams: {
            page: number,
            sortBy?: string
            sort?: string
            limit?: number

        } = { page: props.page ?? 1, limit: props.limit }
        if (props.sortBy && props.sortBy?.length > 0) {
            queryParams.sortBy = props.sortBy
        }
        if (props.sort && props.sort?.length > 0) {
            queryParams.sort = props.sort
        }
        fetchClientsRef.current(queryParams)
    }, [props.page, props.sortBy, props.limit, props.sort])

    const clientsTableData = React.useMemo(() => {
        return clients.map(item => {
            return {
                clientName: item.name,
                companyName: item.companyDetails.name,
                invoicesCount: item.invoicesCount,
                totalBilled: item.totalBilled,
                id: item.id
            }
        }) ?? []
    }, [clients])

    if (!clients) {
        //loading state here
        return <SkeltonLoadingList data-test="loading-overlay" />
    }
    if (clients.length == 0) {
        //loading state here
        return <SkeltonLoadingList data-test="loading-overlay" />
    }

    return (
        <div>
            <GenericTableHeader
                header="Latest clients"
                buttonFor="Clients"

            />
            {/* <pre>{JSON.stringify({ clients, total }, null, 4)}</pre> */}
            <ClientsTable clientsTableData={clientsTableData} updateRoute={props.updateRoute}
                editQuery={props.editQuery}
            />
            {props.renderFooter?.(total)}
        </div>
    )
}