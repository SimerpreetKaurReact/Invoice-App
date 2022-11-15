
import { useState, useEffect } from "react"


import { useRouter } from 'next/router'
import ResponsiveAppBar from "../../../src/components/AppBar"
import CreateInvoiceFormContainer from "../../../src/invoice/CreateInvoiceFormContainer"
import AuthGuard from "../../../src/user/AuthGaurd"
import SkeltonLoadingList from "../../../src/components/SkeltonLoadingList"

const EditInvoicePage = () => {

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
        console.log("loading before auth")
        return null
    }
    const invoiceId = Array.isArray(router.query?.invoiceId) ? router.query.invoiceId[0] : router.query.invoiceId

    return (<AuthGuard> <ResponsiveAppBar /><CreateInvoiceFormContainer invoiceId={invoiceId} button="View" /></AuthGuard>)


}

export default EditInvoicePage 