import { Pagination } from '@mui/material'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { fetchInvoices, InvoiceDTO } from '../../src/api/base'
import ResponsiveAppBar from '../../src/components/AppBar'
import { Filtering, InvoiceTableContainter } from '../../src/invoice/invoiceTableContainer'
import AuthGuard from '../../src/user/AuthGaurd'

type Props = {}

const Invoices = (props: Props) => {
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
    console.log("current page update", page)
    const sortBy = router.query.sortBy ? Array.isArray(router.query.sortBy) ? router.query.sortBy[0] : router.query.sortBy : ""
    const sortOrder = router.query.sortOrder ? Array.isArray(router.query.sortOrder) ? router.query.sortOrder[0] : router.query.sortOrder : ""
    const clientId = router.query.clientId ? Array.isArray(router.query.clientId) ? router.query.clientId[0] : router.query.clientId : ""
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
            <InvoiceTableContainter page={page} sortBy={sortBy} sortOrder={sortOrder} clientId={clientId}
                renderFooter={(apiResponse) =>

                    //useCallback
                    <>
                        <Pagination
                            page={page}
                            onChange={(ev, page) => {
                                router.push({
                                    pathname: router.pathname,
                                    query: { ...router.query, page }
                                })

                            }}
                            count={Math.ceil(apiResponse.total / 5)} />

                    </>
                }
                renderFiltering={(apiResponse) =>
                    <>

                        <Filtering apiResponse={apiResponse} onChange={(ev, clientId) => {
                            router.push({
                                pathname: router.pathname,
                                query: { ...router.query, clientId }
                            })

                        }} />
                    </>}
                updateRoute={updateRoute}
            />
        </AuthGuard>
    )
}

export default Invoices

export interface InvoiceGroup { invoices: InvoiceDTO[]; total: number }


