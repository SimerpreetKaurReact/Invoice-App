import { useRouter } from "next/router"
import { useEffect } from "react"
import { CompanyAuthState, useCompanyAuthContext } from "../company/CompanyDetailsAuth"
import { useAuthContext, UserAuthState } from "./AuthContext"
import { useSnackbar } from 'notistack';

const AuthGuard = (props: { children: React.ReactNode }) => {
    const { enqueueSnackbar } = useSnackbar();


    const { authState } = useAuthContext()
    const { companyState } = useCompanyAuthContext()
    const router = useRouter()

    useEffect(() => {
        console.log(authState)
        if (authState === UserAuthState.NOT_AUTH) {
            router.replace("/login")
        }
        else if (companyState === CompanyAuthState.DETAILS_UNAVAILABLE && authState === UserAuthState.AUTH) {

            enqueueSnackbar(`Please set company details first`, { variant: "error" })

            router.replace("/company-details")
        }


    }, [authState])
    if (authState === UserAuthState.UNDECIDED || authState === UserAuthState.NOT_AUTH) {
        return null
    }
    return (<>{authState}{companyState}{props.children}</>)

}

export default AuthGuard

//add one error boundary on every page