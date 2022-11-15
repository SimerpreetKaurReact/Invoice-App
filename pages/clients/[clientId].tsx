
import { useState, useEffect } from "react"
import CreateClientFormContainer from "../../src/clients/CreateClientFormContainer";
import ResponsiveAppBar from "../../src/components/AppBar";
import AuthGuard from "../../src/user/AuthGaurd";

import { useRouter } from 'next/router'

const EditClientPage = () => {

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
    const clientId = Array.isArray(router.query?.clientId) ? router.query.clientId[0] : router.query.clientId
    console.log(clientId)
    return (<AuthGuard> <ResponsiveAppBar /><CreateClientFormContainer clientId={clientId} /></AuthGuard>)


}

export default EditClientPage 