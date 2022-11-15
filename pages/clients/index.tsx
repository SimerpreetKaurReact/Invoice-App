import React, { useEffect, useRef, useState } from 'react'
import AuthGuard from '../../src/user/AuthGaurd'
import { useRouter } from 'next/router'

import create from 'zustand'
import { fetchClients, Client, fetchInvoices } from '../../src/api/base'
import produce from 'immer'
import { Pagination } from '@mui/material'
import ResponsiveAppBar from '../../src/components/AppBar'
import { ClientsTableContainer } from '../../src/clients/ClientTableContainer'

interface ClientsStore {
    clients: Client[]
    total: number

    fetchClients: (queryParams?: {
        page: number;
        sortBy?: string | undefined;
        sort?: string | undefined;
        limit?: number | undefined;
    }) => Promise<unknown>
}
export const useClientListingStore = create<ClientsStore>((set) => ({
    clients: [],
    total: 0,

    fetchClients: async (queryParams?: {
        page: number;
        sortBy?: string | undefined;
        sort?: string | undefined;
        limit?: number | undefined;
    }) => {
        try {
            const apiResponse = await fetchClients(queryParams)
            console.log(apiResponse)
            set(produce((state: ClientsStore) => {
                state.clients = apiResponse?.clients ?? []
                state.total = apiResponse?.total ?? 0
            }))
        } catch (error) {
            //state based error handling, set(state=>{error here})
        }

    }

}))
type Props = {}

const Clients = () => {

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        console.log("current page update")
        if (!router.isReady) {
            return
        }

        setIsLoading(false)

    }, [router.isReady])
    if (isLoading) {
        return null
    }
    const page = router.query.page ? parseInt(Array.isArray(router.query.page) ? router.query.page[0] : router.query.page, 10) : 1

    const sortBy = router.query.sortBy ? Array.isArray(router.query.sortBy) ? router.query.sortBy[0] : router.query.sortBy : ""
    const sortOrder = router.query.sortOrder ? Array.isArray(router.query.sortOrder) ? router.query.sortOrder[0] : router.query.sortOrder : ""
    console.log("current page update", page)
    const updateRoute = (property: string | {}) => {
        if (typeof (property) === "string") {
            router.push(property)
        } else {
            router.push({
                pathname: router.pathname,
                query: { ...router.query, ...property }
            })
        }
    }
    return (
        <AuthGuard>
            <ResponsiveAppBar />

            <ClientsTableContainer page={page} sortBy={sortBy} sort={sortOrder} renderFooter={(total) =>

                //useCallback
                <Pagination
                    page={page}
                    onChange={(ev, page) => {
                        router.push({
                            pathname: router.pathname,
                            query: { ...router.query, page }
                        })

                    }}
                    count={Math.ceil(total / 5)}
                />
            } updateRoute={updateRoute} />
        </AuthGuard>
    )
}

export default Clients


