import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { setCookie, removeCookies, getCookie } from "cookies-next"
import { useAuthContext } from "../user/AuthContext";
import { Company } from "../api/base";

export const enum CompanyAuthState {
    UNDECIDED = "UNDECIDED", PENDING = "PENDING", DETAILS_AVAILABLE = "DETAILS_AVAILABLE",
    DETAILS_UNAVAILABLE = "DETAILS_UNAVAILABLE"
}

interface CompanyContextType {
    companyDetails: Company | null
    companyState: CompanyAuthState
    persistCompanyDetails: (info?: Company) => unknown,
}
export const COMPANY_DETAILS = "company_details"


export const CompanyAuthContext = createContext<null | CompanyContextType>(null)

export const CompanyContextProvider = (props: { children: React.ReactNode }) => {
    const [companyState, setCompanyState] = useState(CompanyAuthState.UNDECIDED)
    const [companyDetails, setCompanyDetails] = useState<Company | null>(null)

    const { authState } = useAuthContext()
    useEffect(() => {
        const companyInfo = getCookie(COMPANY_DETAILS)


        if (companyInfo) {
            console.log("cookies companyInfo", companyInfo, JSON.parse(companyInfo as string))

            setCompanyDetails(JSON.parse(companyInfo as string))
            setCompanyState(CompanyAuthState.DETAILS_AVAILABLE)
        } else {
            setCompanyState(CompanyAuthState.DETAILS_UNAVAILABLE)
            setCompanyDetails(null)

        }
    }, [authState])
    const persistCompanyDetails = useCallback((companyInfo?: Company) => {

        if (companyInfo) {
            setCookie(COMPANY_DETAILS, companyInfo)
            setCompanyState(CompanyAuthState.DETAILS_AVAILABLE)
            console.log(companyState)
        } else {
            removeCookies(COMPANY_DETAILS)
            setCompanyState(CompanyAuthState.DETAILS_UNAVAILABLE)
            // setAPIUserToken(null)
            console.log("unset user token")
        }
    }, [companyState])

    const contextValue = useMemo(() => ({
        companyDetails: companyDetails,
        companyState,
        persistCompanyDetails,

    }), [companyState, persistCompanyDetails, companyDetails])
    return (
        <CompanyAuthContext.Provider value={contextValue}>{props.children}</CompanyAuthContext.Provider>
    )
}


export const useCompanyAuthContext = () => {


    const ctx = useContext(CompanyAuthContext)
    if (ctx === null) {
        throw new Error("you are not supposed to access the context without any ancestor provided to it ")
    }
    return ctx

}